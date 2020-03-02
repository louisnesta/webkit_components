<template>
  <div class="section_terms md:p-10" id="terms">
    <div class="md:w-3/4 md:px-4 md:pr-10">
      <h1 class="text-white font-bold">
        ABOUT THIS WEBSITE
      </h1>
      <p class="text-white mt-2">
        The NGI Policy Summit is organised by the  
        <a
          class="underline"
          href="https://www.amsterdam.nl/"
          target="_blank"
          >City of Amsterdam</a
        >
        and 
        <a
          class="underline"
          href="https://www.nesta.org.uk/"
          targert="_blank"
          >Nesta</a
        >, in collaboration with the European Commission.
      </p><p class="text-white mt-2">This website is run by NGI Forward, which is part of the NGI initiative. NGI Forward has received funding from the European Union’s Horizon 2020 research and innovation programme under the Grant Agreement no 825652. The content of this website does not represent the opinion of the European Union, and the European Union is not responsible for any use that might be made of such content.</p>

    </div>

    <div class="md:w-1/4 pt-6 md:p-0 md:px-6 border-gray-100 md:border-l">
      <div class="w-full h-16 mb-4 bg-contain bg-no-repeat " :style="{backgroundImage: 'url(' + require('../assets/img/bandiera_stelle.png') + ')'}"></div>
      <a href="https://ngi.eu/" target="_blank" ><div class="w-full h-16 bg-contain bg-no-repeat " :style="{backgroundImage: 'url(' + require('../assets/img/logo-footer.svg') + ')'}"></div></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>