export default {
  methods: {
  	getJson(value) {
    	const doc = new DOMParser().parseFromString(value, "text/html");
    	var json = [...doc.querySelectorAll('code')].map(code => code.textContent);
    	var final = String(json).replace(/\n/g, " ");
    	if (final !== '') {
      		var obj = JSON.parse(final);
      		return obj;
      	} else {
      		return null
      	}
      }
  	}
}