import generatePassword from "secure-random-string";
import parameterize from "parameterize";

const createUser = (form, authKey, errorMessages) =>
  fetch(
    `${process.env.VUE_APP_DISCOURSE_USER_URL}?${Object.entries({
      accepted_gtc: true,
      accepted_privacy_policy: true,
      edgeryders_research_content: true,
      requested_api_keys: [process.env.VUE_APP_DISCOURSE_DOMAIN],
      auth_key: authKey,
      email: formField(form, "email"),
      username: generateUsername(form),
      password: generatePassword({ length: 15 })
    })
      .map(pair => pair.map(encodeURIComponent).join("="))
      .join("&")}`
  ).then(
    response => handleResponse(response, errorMessages),
    response => handleNetworkError(response, errorMessages)
  );

const createTopic = (form, apiKey, errorMessages) =>
  fetch(process.env.VUE_APP_DISCOURSE_TOPIC_URL, {
    method: "post",
    headers: { "Api-Key": apiKey, "Content-Type": "application/json" },
    body: JSON.stringify({
      title: `Rethinking retirement - response by ${formField(form, "name")}`,
      raw: generateResponse(form),
      category: process.env.VUE_APP_DISCOURSE_CATEGORY
    })
  }).then(
    response => handleResponse(response, errorMessages),
    response => handleNetworkError(response, errorMessages)
  );

const handleResponse = (response, errorMessages) =>
  response.ok
    ? response.json()
    : response
        .json()
        .then(({ errors }) =>
          Promise.reject(
            Object.keys(errors).map(
              key => errorMessages[key] || errorMessages.default
            )
          )
        );

const handleNetworkError = (response, errorMessages) =>
  Promise.reject([errorMessages.networkError]);

const formField = (form, field) =>
  Object.values(form)
    .map(f => (f[field] || {}).value)
    .filter(value => value)
    .join("");

const generateUsername = form =>
  `${parameterize(formField(form, "name"), 20, "_")}_${Math.ceil(
    Math.random() * 100
  )}`;

const generateResponse = form =>
  Object.values(form)
    .map(({ body, settings: { omitBody, omitFields }, ...fields }) => [
      omitBody ? "" : `**${body}**`,
      Object.entries(fields)
        .filter(
          ([
            ,
            {
              settings: { omit }
            }
          ]) => !omit
        )
        .map(([field, { value }]) =>
          [omitFields ? "" : `**${field}:** `, value].join("")
        )
        .join("\n")
    ])
    .flat()
    .join("\n\n");

export default (form, errorMessages) =>
  createUser(
    form,
    process.env.VUE_APP_DISCOURSE_AUTH_KEY,
    errorMessages
  ).then(json => (
    form.settings.createTopic
      ? createTopic(form, json.api_keys[0].key, errorMessages)
      : json
  ))
