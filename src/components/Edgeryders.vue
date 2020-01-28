<template>
  <div class="section md:section-md" id="edgeryders">
    <div class="section_title flex items-center">
      <div class="er_logo mr-3"></div>
      <h1 class="text-2xl md:text-4xl font-bold">{{ custom.title }}</h1>
    </div>
    <div class="w-full flex flex-col items-start justify-between bg-white">
      <div
        class="w-full flex flex-col md:flex-row md:px-0 md:mt-4 leading-normal"
      >
        <div
          class="w-full pt-0 md:w-1/2 md:px-6 md:px-0 md:pr-8 md:pt-2 text-left md:text-right md:border-r border-gray-200"
        >
          <h3
            class="hidden font-display text-2xl font-bold text-center md:inline-block md:text-right md:mb-2 mt-2"
          >
            And we are listening.
          </h3>
          <p class="text-lg">
            We are collecting your stories to better understand how we can level
            up impact of our efforts to fix socialecological, economic, and
            political challenges. We want to know what you have to say, and we
            want others to connect and collaborate with you.
          </p>
          <a href="https://edgeryders.eu/c/campfire" target="_blank"
            ><button
              class="text-white bg-primary border border-primary text-xm font-semibold rounded-lg px-4 py-3 mt-6 leading-normal"
            >
              Tell us what brings you here
            </button></a
          >
        </div>
        <div class="md:w-1/2 flex flex-col md:pl-8 mt-4">
          <div class="w-full inline-block">
            <div class="icon automation"></div>
            <div class="icon activism"></div>
            <div class="icon healthcare"></div>
            <div class="icon ai"></div>
            <div class="icon elections"></div>
            <div class="icon network"></div>
            <div class="icon environment"></div>
            <div class="icon nomad"></div>
          </div>
        </div>
      </div>
      <div class="w-full md:flex md:px-0 text-left leading-normal">
        <div class="md:w-1/2 mt-0 md:pt-8 pr-8 md:border-r border-gray-200">
          <div class="er_photo">
            <div class="photo">
              <h3>( that's only some of us.. )</h3>
            </div>
          </div>
        </div>
        <div class="md:w-1/2 mt-2 px-0 pt-0 mb-12 md:pl-8 pt-4">
          <h3
            class="font-display leading-tight text-2xl font-bold text-left md:leading-normal mb-2"
          >
            This is how it works.
          </h3>
          <p class="text-lg m-0 pr-0">
            Edgeryders is platform of over 5.000 people who have been sharing
            their stories, their ideas, their problems, and their solutions
            since 2013. All these posts together are what we call our
            "collective intelligence". Our data analysis team uses open source
            methodologies and technologies to create interactive visualisations
            of the conversations as they evolve. The visualisations make it
            easier for everyone to find and connect across common interests and
            new insights.
          </p>
          <a href="https://edgeryders.eu/c/campfire" target="_blank"
            ><button
              class="text-white bg-primary border border-primary text-xm font-semibold rounded-lg px-4 py-3 mt-6 leading-normal"
            >
              Connect with the community
            </button></a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["custom"]
};
</script>

<style type="text/css" lang="scss">
@import url("https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap");

.er_logo {
  background: url("data:image/svg+xml,%3Csvg width='500' height='500' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle fill='%23FFF' cx='260' cy='271' r='209'/%3E%3Cpath d='M0 250a250 250 0 11500 0 250 250 0 01-500 0zm97-103v106h42v-16h-26v-31h19v-16h-19v-27h26v-16H97zm80 91c6 0 8-4 8-11v-52c0-8-4-12-13-12h-4v75h9zm-25-91h23c19 0 27 10 27 29v48c0 20-8 29-26 29h-24V147zm63 25c0-17 9-27 25-27s24 9 24 27v10h-16v-11c0-8-3-11-8-11-6 0-9 3-9 11v59c0 7 3 11 9 11 5 0 8-4 8-11v-17h-10v-13h26v53h-8l-3-7c-4 7-9 10-16 10-14 0-22-11-22-30v-54zm64-25h43v16h-26v27h18v16h-18v31h26v16h-43V147zM112 381H95V275h24c18 0 26 8 26 30 0 13-3 21-10 26l12 50h-17l-10-45h-8v45zm0-60v-31h6c8 0 10 3 10 15 0 11-2 16-10 16h-6zm53-46l10 42h1l10-42h17l-19 62v44h-16v-42l-20-64h17zm69 90c6 0 9-4 9-11v-51c0-9-4-13-13-13h-4v75h8zm-24-90h23c18 0 27 9 27 29v47c0 20-8 30-26 30h-24V275zm136 46v-31h6c8 0 10 3 10 15 0 11-2 16-10 16h-6zm-72-46h43v15h-26v28h19v15h-19v32h26v16h-43V275zm72 106h-16V275h24c17 0 25 8 25 30 0 13-3 21-10 26l12 50h-17l-10-45h-8v45zm57-30c1 11 4 16 11 16 6 0 10-4 10-10 0-9-6-14-15-23-12-12-20-21-20-35 0-15 11-26 25-26s24 10 25 26l-16 2c-1-9-3-13-9-13-5 0-9 4-9 10 0 9 7 16 17 25 11 11 18 19 18 34s-11 26-26 26-26-11-27-29l16-3zm-65-172v-42h-42a42 42 0 1142 42z' fill='%23FF4501'/%3E%3C/g%3E%3C/svg%3E")
    no-repeat center center;
  width: 60px;
  height: 60px;
  background-size: 100%;
}

.er_photo {
  transform: rotate(-1.2deg);
  .photo {
    background: url("../assets/edgeryders_group.jpg") no-repeat center 15px
      #f7f8f8;
    background-size: 95%;
    height: 200px !important;
    padding-bottom: 10px;
    position: relative;
    border-radius: 10px;
    width: 90%;
    left: 5%;
    margin-top: 2%;
    &:before,
    &:after {
      z-index: -1;
      position: absolute;
      content: "";
      bottom: 15px;
      left: 10px;
      width: 50%;
      top: 80%;
      max-width: 300px;
      background: #777;
      box-shadow: 0 15px 10px #777;
      transform: rotate(-3deg);
    }
    &:after {
      transform: rotate(3deg);
      right: 10px;
      left: auto;
    }
    h3 {
      position: absolute;
      bottom: 0%;
      left: 0%;
      width: 100%;
      text-align: center;
      color: orangered;
      font-size: 1.1em;
      font-family: "Permanent Marker", cursive;
    }
  }
}
.icon {
  background-color: #fafafa !important;
  border: 2px solid rgba(0, 0, 0, 0.01);
  background-position: center center !important;
  background-repeat: no-repeat !important;
  background-size: 50%;
  width: 23%;
  max-height: 85px !important;
  float: left;
  display: inline-block;
  margin: 0 4% 4% 0;
  border-radius: 10px;
  &.automation {
    background-image: url("data:image/svg+xml,%3Csvg width='70' height='77' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-rule='nonzero'%3E%3Cpath stroke='%23FF4501' stroke-width='.5' fill='%23FF4501' d='M11.5 26.3a11.4 11.4 0 0 0-3 22.4l9 20.1a17.8 17.8 0 0 0-3.7 4.4c-.4.8-.4 1.8 0 2.5.5.8 1.3 1.3 2.2 1.3h26.5a2.5 2.5 0 0 0 2.2-3.8c-2.8-4.8-7.6-8-13.1-8.7l-11.8-19a11.4 11.4 0 0 0 3-9.5l18.6-17.6a9 9 0 0 0 1.9.3 9 9 0 0 0 2.2-.3l9.2 7.8c0 2.2 1 4.3 2.6 5.7v5.8c0 1 .6 2 1.5 2.3l1.1 4a2.5 2.5 0 0 0 5 0l1-4c1-.4 1.6-1.3 1.6-2.3v-5.8A7.6 7.6 0 0 0 61 18.8l-9-7.6.2-1.4a8.9 8.9 0 0 0-17.8 0v1L14.2 26.7l-2.7-.3zm30.5 48H15.9A15 15 0 0 1 30.3 67c4.9.3 9.2 3 11.7 7.2zM27.5 64h-.4l-1 .1h-.4l-1.3.3h-.2l-1 .4-.5.1-.8.4-.5.1-.9.5-.3.1-1 .7-8-17.7H13l1.4-.4h.2L16 48h.1l1.3-.7h.1L28 64h-.5zm-10-19.9a9 9 0 0 1-7 2.1h-.6A8.8 8.8 0 1 1 14.3 29a8.8 8.8 0 0 1 3.2 15.1zm46-11.4l.9-.3V37h-4.7v-4.6l1 .2h.1a6 6 0 0 0 2.4 0h.2zm-2.9-12.4v10.2h-.3l-1.4-.8c-1.2-1-2-2.6-2-4.3V25l.2-.8a5.1 5.1 0 0 1 3.5-3.8zm2 22.3l-1-2.8h1.9l-1 2.8zm4.6-17.2c0 1.7-.7 3.3-2 4.3-.5.4-1.1.7-1.7.8V20.4c2.2.6 3.7 2.7 3.7 5.1zm-8.4-5.7l-.7.5-.2.2c-.6.5-1.1 1-1.6 1.7l-.5 1-7.3-6 1-.6.7-.8.2-.2.6-.6.2-.4.4-.6 7.1 5.8h.1zm-15.9-17a6.5 6.5 0 0 1 6.1 8.9 6.5 6.5 0 0 1-12.6-2.4c0-3.6 3-6.5 6.5-6.5zM34.7 13l.1.2.4.7.2.3.7.9.1.1 1 .9.2.2.8.5-16.5 15.7-.3-.7v-.1l-.7-1.2-.2-.2-.8-1-1-.9-.1-.2-1-.7-.3-.1-.5-.4 18-14z'/%3E%3Cpath fill='%23FF4501' d='M54.3 54.6l1.2.1c2.4 0 4.2-1.6 4.2-3.7 0-2-1.8-3.7-4.2-3.7-2.3 0-4.2 1.7-4.2 3.7l.1.8a4 4 0 0 0 2.9 2.8zm1.2-5.4c.8 0 1.4.6 1.4 1.4 0 .7-.6 1.3-1.4 1.3h-.4-.2l-.3-.3-.1-.2-.4-.5v-.3c0-.8.7-1.4 1.4-1.4z'/%3E%3C/g%3E%3C/svg%3E");
  }
  &.activism {
    background-image: url("data:image/svg+xml, %3Csvg width='72' height='76' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FF4501' d='M67.1 17.7C62 7.3 52.8.4 44.4.4c-2.2 0-4.3.5-6.3 1.4-4 2-6.6 5.8-7.8 10.6A166.5 166.5 0 0 1 8 30.9a15.1 15.1 0 0 0-5.5 19.3c2.5 5 7.7 8 13.2 8 1.8 0 3.6-.3 5.4-.9h.2L28 71a7.7 7.7 0 0 0 10.3 3.4l1-.5c3.8-1.9 5.4-6.5 3.5-10.4l-5.5-10.9c3.8-.9 7.8-1.7 11.7-2.2A18 18 0 0 0 56 52c2.2 0 4.4-.5 6.3-1.5 4.6-2.3 7.6-7 8.5-13.4.8-6.1-.5-13-3.7-19.4zM39.5 65.2c1.1 2.2.2 5-2 6.2l-1 .5a4.5 4.5 0 0 1-6-2L24 56.1c2.3-.7 5.8-1.8 9.8-2.8l5.7 11.8zM19.8 53.6c-5.9 2-12-.2-14.6-5.5a11.8 11.8 0 0 1 4.4-15c.4-.3 10.6-7.3 19.5-15.7-.2 5.2 1 11.1 3.8 16.8A34.9 34.9 0 0 0 44 47.4c-12 2-23.7 6-24.2 6.2zM44 29.3c1.2 2.3 3 4 4.9 5l-8.3 6a34.7 34.7 0 0 1-7.7-15l10-3c-.5 2.1-.1 4.6 1 7zm3.3-8.7a2 2 0 0 1 1-.2c1.6 0 3.5 1.6 4.7 3.9.7 1.5 1 3.1.9 4.5-.1.7-.4 1.9-1.4 2.4a2 2 0 0 1-1 .2c-1.6 0-3.6-1.7-4.7-4-1.4-2.8-1.1-6 .5-6.8zm20.4 15.7c-.7 5.2-3 9.1-6.7 11-1.5.7-3.1 1-4.8 1-4.4 0-9-2.2-12.9-6L54.7 34a6.1 6.1 0 0 0 3-4.7c.2-2-.2-4.3-1.3-6.3-1.7-3.5-4.7-5.7-7.6-5.7-.8 0-1.5.2-2.2.5l-13.4 4c-.9-7.8 1.5-14.6 6.7-17.2 1.5-.8 3.1-1.1 4.9-1.1 7.2 0 15 6.2 19.7 15.4a31 31 0 0 1 3.3 17.5z' stroke='%23FF4501' stroke-width='.3'  fill-rule='nonzero'/%3E%3C/svg%3E");
  }
  &.healthcare {
    background-image: url("data:image/svg+xml, %3Csvg width='72' height='82' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF4501' fill-rule='nonzero'%3E%3Cpath fill='%23FF4501' d='M58.1 41a6 6 0 0 1 6 6c0 1.1.8 2 2 2 1 0 1.9-.9 1.9-2 0-20.2-14-36.7-31.5-37.9V3a2 2 0 0 0-2-2c-1 0-2 .9-2 2v6.1C15 10.3 1 26.8 1 47a2 2 0 0 0 4 0 6 6 0 0 1 5.9-6 6 6 0 0 1 5.9 6c0 1.1.8 2 2 2 1 0 2-.9 2-2a6 6 0 0 1 5.8-6 6 6 0 0 1 6 6v24a6 6 0 0 1-6 6 6 6 0 0 1-5.9-6 2 2 0 0 0-2-2c-1 0-2 .9-2 2a10 10 0 0 0 10 10 10 10 0 0 0 9.8-10V47a6 6 0 0 1 5.9-6 6 6 0 0 1 5.9 6 2 2 0 0 0 4 0 6 6 0 0 1 5.8-6zm-7.8 0a9.8 9.8 0 0 0-15.8 0 9.8 9.8 0 0 0-15.8 0A9.8 9.8 0 0 0 6 38.4C9.2 23.8 20.8 13 34.5 13c13.7 0 25.3 10.8 28.6 25.4A9.7 9.7 0 0 0 50.3 41z' stroke='%23FF4501' stroke-width='.4'/%3E%3Cpath fill='%23FF4501' d='M70 65h-6v-6a2 2 0 0 0-4 0v6h-6a2 2 0 0 0 0 4h6v6a2 2 0 0 0 4 0v-6h6a2 2 0 0 0 0-4z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }
  &.ai {
    background-image: url("data:image/svg+xml, %3Csvg width='66' height='77' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='nonzero'%3E%3Cpath fill='%23FF4501' d='M64.2 38.1l-6.6-10c-.2-.4-.3-.7-.3-1.2A28 28 0 0 0 29.3 1 28.4 28.4 0 0 0 1 29.5c0 9 4.2 18.1 11.2 24.1.2.2.5.5.5.9v15c0 2.4 1.7 4.3 4 4.5l22.4 2h.4c1 0 2.2-.4 3-1.2 1-.9 1.5-2 1.5-3.3v-9.6h6.9c3.6 0 6.5-3 6.5-6.6V46H60a5 5 0 0 0 4.4-2.6 5 5 0 0 0-.1-5.3zm-3.7 3.2c0 .2-.2.4-.6.4H56a3 3 0 0 0-3 3v10.7c0 1.2-1 2.2-2.2 2.2h-7.9a3.5 3.5 0 0 0-3.4 3.5v10.6l-22.5-2v-15c0-1.6-.7-3.2-2-4.3-6-5.1-9.6-13.1-9.6-20.9a24 24 0 0 1 23.8-24c12.4 0 22.6 9.3 23.7 21.8 0 1 .4 2 1 3l6.6 10.2c.2.3 0 .6 0 .8z' /%3E%3Cpath fill='%23FF4501' d='M32 15.9a3 3 0 0 0-3-2.9 3 3 0 0 0-3 2.9c0 1 .6 2 1.6 2.5v24C26.6 43 26 44 26 45a3 3 0 0 0 3 3 3 3 0 0 0 3-3c0-1-.6-2-1.6-2.5v-24C31.4 18 32 17 32 16zM21 20.4c.8-.4 1.4-1.4 1.4-2.5 0-1.6-1.3-2.9-2.8-2.9a3 3 0 0 0-2.8 3c0 1 .6 2 1.5 2.4v5.2h4v3.6h-6c-.4-1-1.4-1.6-2.4-1.6a2.9 2.9 0 1 0 0 5.8c1 0 2-.6 2.5-1.6h6v3.6h-4.1v5.2c-1 .4-1.5 1.4-1.5 2.5 0 1.6 1.2 2.9 2.8 2.9 1.6 0 2.8-1.3 2.8-3 0-1-.6-2-1.5-2.4V38H25V23h-4v-2.6zM46.1 27.7c-1 0-2 .6-2.5 1.5h-6v-3.5h4.1v-5.2c1-.5 1.5-1.5 1.5-2.6 0-1.6-1.2-2.9-2.8-2.9a2.8 2.8 0 0 0-2.8 3c0 1 .6 2 1.5 2.5V23H35V38h4.2v2.6c-1 .5-1.6 1.5-1.6 2.6 0 1.6 1.3 2.8 2.8 2.8 1.6 0 3-1.3 3-2.8 0-1.1-.7-2.1-1.6-2.6v-5.2h-4.2v-3.6h6c.5 1 1.5 1.6 2.5 1.6 1.6 0 2.9-1.3 2.9-2.9 0-1.6-1.3-2.8-2.9-2.8z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }
  &.elections {
    background-image: url("data:image/svg+xml, %3Csvg width='78' height='74' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FF4501' d='M70.7 52.7c-.3-.7-.8-1-1.5-1h-8.7V38.7c0-2.5-2-4.6-4.7-4.6h-1.1v-3.9c0-1.7-.7-3.4-1.9-4.6L30.3 2.5a7 7 0 0 0-9-1L10.5 8.7c-2 1.3-3 3.6-2.7 6L10 30.6c0 2.2.9 4.4 2.4 6L16 41v10.6H8.8c-.7 0-1.3.5-1.5 1L1.1 71.5a1.5 1.5 0 0 0 1.4 2h73c.4 0 1-.3 1.2-.7.3-.4.4-1 .2-1.4l-6.2-18.6zM13.2 30.3v-.2l-2.2-16a3 3 0 0 1 1.4-3l10.9-7a4 4 0 0 1 5 .5l22.7 23c.6.7 1 1.6 1 2.6V34H30.8l-1.4-2.8c-.4-.8-1.3-1-2.1-.7-.8.4-1 1.3-.7 2L35.4 50c.7 1.4.5 3-.6 4.2a3.9 3.9 0 0 1-4.2 1l-.3-.1c-.8-.3-1.5-.9-2-1.6l-5.8-9.9a7 7 0 0 0-.7-1l-7-8a6.4 6.4 0 0 1-1.6-4.2zm6 13.6c0 .2.2.3.3.5l5.8 10.1a7 7 0 0 0 3.4 3l.3.1c.8.3 1.7.5 2.5.5 2.4 0 4.6-1.3 5.9-3.3 1.2-2.1 1.3-4.7.2-6.9L32 36.4h23.6c.8 0 1.5.7 1.5 1.5v24.5H19V43.7l.1.2zM4 70.4l5.2-16h6.1v8.4h-3c-1 0-1.6.8-1.6 1.6 0 1 .7 1.6 1.6 1.6H63c.8 0 1.5-.7 1.5-1.6 0-.8-.7-1.6-1.5-1.6h-3v-8.4h7.7l5.2 16H4z' stroke='%23FF4501' stroke-width='1' fill-rule='nonzero'/%3E%3C/svg%3E%0A");
  }
  &.network {
    background-image: url("data:image/svg+xml, %3Csvg width='76' height='76' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23FF4501' d='M38 1.4c-5 0-9 4-9 8.9a9 9 0 0 0 6.5 8.6v10.3c-2.4.5-4.6 1.7-6.3 3.4l-10.7-8c.4-.9.6-1.9.6-3a9 9 0 1 0-18 0 9 9 0 0 0 14.5 7l11 8a11.9 11.9 0 0 0 1.8 12.1l-9 9a9 9 0 0 0-13.5 7.7 9 9 0 1 0 18 0c.1-1.5-.3-3-1-4.3l9.3-9.2a12.3 12.3 0 0 0 11.6 0L53 61a8.7 8.7 0 0 0-1.1 4.3 9 9 0 1 0 18 0 9 9 0 0 0-13.4-7.7l-9-9a12 12 0 0 0 1.8-12l11-8a9 9 0 0 0 14.6-7 9 9 0 1 0-18 0c-.1 1 .1 2 .5 3l-10.8 7.9a12.4 12.4 0 0 0-6.2-3.4V18.9a9 9 0 0 0 6.5-8.6c0-5-4-9-9-9zm0 4.8a4 4 0 1 1 0 8.1 4 4 0 1 1 0-8zM10 17.6a4 4 0 1 1 0 8.1 4 4 0 1 1 0-8.1zm56 0a4 4 0 1 1 0 8.1 4 4 0 1 1 0-8.1zM38 33.8a7.3 7.3 0 1 1 0 14.6 7.3 7.3 0 1 1 0-14.6zM15 61.4a4 4 0 1 1 0 8.1 4 4 0 1 1 0-8.1zm46 0a4 4 0 1 1 0 8.1 4 4 0 1 1 0-8.1z' fill-rule='nonzero' /%3E%3C/svg%3E%0A");
  }
  &.environment {
    background-image: url("data:image/svg+xml, %3Csvg width='77' height='74' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-rule='nonzero' %3E%3Cpath fill='%23FF4501' d='M75.8 40c-.8-4-4.2-6.4-7.8-5.7l-13.4 3a5.8 5.8 0 0 0-4.5-2.8l-20-1.5c-2.7-.2-5.5.7-7.8 2.6L11 44.7 1.6 55c-.8.9-.8 2.2 0 3.1l13 14.3c.3.4.8.6 1.4.6.5 0 1-.2 1.4-.6l8.2-9 13.9 1.9c4.6.6 9.4-.6 13.4-3.4l20-14.1a7.6 7.6 0 0 0 3-7.9zM16 67.6L6 56.5l6-6.7L22.1 61l-6 6.7zM70.7 44l-20 14.1A15 15 0 0 1 40 60.8L25.8 59 15 46.9l9.6-7.9a7.1 7.1 0 0 1 5.2-1.6l20 1.5c1 0 1.7 1 1.8 2 0 1-.5 2-1.5 2.2l-4.9 1.3c-1.9.5-3.8.7-5.8.6l-5.7-.3c-1.1 0-2 .9-2.1 2.1-.1 1.2.8 2.3 1.9 2.3l5.6.3c2.4.2 4.7 0 7-.7l4.9-1.2c2.6-.6 4.4-3 4.6-5.8l13-3c1.5-.3 2.9.8 3.2 2.4.3 1-.1 2.3-1.1 3z' stroke-width='1.3'/%3E%3Cpath fill='%23FF4501' d='M25 26.7c.4 0 .7 0 1.1-.3 2.6-1.8 5.5-3.3 8.3-4.5C40 25.2 45.3 27 50 27c2.6 0 5.1-.5 7.4-1.5C68.2 20.9 71.8 7.5 72 6.9c.2-.7 0-1.6-.6-2.2a2 2 0 0 0-2.2-.3c-3 1.3-6.5 0-10.3-1.3-8-2.8-17.9-6.3-26 14.7-3 1.4-6 3-8.9 5-1 .6-1.2 1.8-.6 2.9.4.7 1 1 1.7 1zM57.5 7.2c3 1 6.1 2.2 9.3 2-1.7 3.9-5 9.8-11 12.3-4.7 2-10.3 1.5-16.6-1.6a74.4 74.4 0 0 1 12.5-3.5c1-.2 1.8-1.2 1.6-2.4a2 2 0 0 0-2.3-1.8c-.4.1-6 1-13 3.6C44.2 2.5 50.5 4.7 57.5 7.2z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }
  &.nomad {
    background-image: url("data:image/svg+xml, %3Csvg width='77' height='73' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF4501' fill-rule='nonzero' stroke='%23FF4501'%3E%3Cpath stroke='%23ddd' stroke-width='.2' d='M75.1 2.8l-.3-.4-.3-.3A2 2 0 0 0 74 2c-3.7-2.2-10.7-.2-15.6 4.4l-7 6.7-32.1-2h-.2c-2.6 0-4.6 1.4-5.1 3.6-.5 2 .7 5.2 5.4 7.2l15.3 7.3c-2.5 2.8-7.2 8.2-9.5 11.9l-9 1c-1 0-1.8 1-1.7 2l.6 4.7c0 .8.8 1.5 1.6 1.6l6.5.9.9 6c.1 1 .8 1.6 1.7 1.7l5 .5c.5 0 1-.1 1.4-.4.4-.3.6-.8.7-1.2l1-8.5c3.8-2.3 9.5-6.8 12.4-9.1l7.7 14.5c1.9 4 4.6 5.3 6.7 5.3h1c2.2-.5 3.6-2.4 3.7-5V55l-2.2-30.6 7.1-6.7c4.8-4.6 7-11.2 4.7-14.8zM60 22.3c-.4.4-.6 1-.6 1.4L61.6 55c0 .6-.2 1.2-.6 1.3-.7.1-2.2-.6-3.4-3.1l-8.8-16.8a2 2 0 0 0-1.7-1 2 2 0 0 0-1.3.4c-.1.1-9.9 8.2-14.6 10.7-.5.3-.9.8-1 1.4l-.8 7.6-1.6-.2-.8-5.9c-.1-.4-.4-.8-.7-1a2 2 0 0 0-1.2-.7l-6.2-.9-.2-1.4 8-.9a2 2 0 0 0 1.5-.9c2.6-4.5 11.1-13.8 11.2-13.8.4-.5.6-1 .4-1.6 0-.6-.4-1-1-1.3l-17.6-8.4c-2.7-1.1-3.4-2.6-3.3-3.2 0-.4.7-.6 1.3-.6l32.9 2a2 2 0 0 0 1.5-.4l7.7-7.4c3.9-3.7 8.7-4.8 10.6-4 .8 1.8-.4 6.4-4.2 10.1L60 22.3z'/%3E%3Cpath fill='%23FF4501' stroke='%23ddd' stroke-width='.2' d='M18.4 33c.8-.6.8-1.8 0-2.5a2 2 0 0 0-2.7 0L1.6 44c-.8.7-.8 1.9 0 2.6a2 2 0 0 0 2.7 0L18.4 33zM40.7 56.6L28.6 68.7a1.9 1.9 0 1 0 2.7 2.7l12.1-12.1a1.9 1.9 0 1 0-2.7-2.7zM17.6 54.5l-13 12.3c-.8.8-.8 2 0 2.7.4.3.9.5 1.4.5.5 0 1-.2 1.4-.5l13-12.3c.8-.7.8-2 0-2.7a2 2 0 0 0-2.8 0z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }
}

@media (max-width: 640px) {
  .icon {
    height: 70px !important;
    width: 21%;
  }
  .er_logo {
    width: 50px;
  }
  .er_photo {
    .photo {
      height: 185px !important;
      width: 100%;
      padding-bottom: 30px;
      left: 0;
      h3 {
        bottom: 4%;
      }
    }
  }
}

@media (min-width: 640px) {
  .icon {
    height: 8.5vw !important;
  }
}
</style>
