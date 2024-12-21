<template>
    <div class="white min-h-screen container py-6" style="max-width: 600px">
  <!-- <h1 class="mb-4 ml-4 font-bold" style="font-size: 1.2rem;">Stores</h1> -->
      <div
            class="blue-grey lighten-5 rounded-xl fill-width d-flex flex-column text-center align-start py-8 px-8 mt-auto justify-space-between align-center"
          >
            <p
              class="grey--text text--darken-3 pr-6"
              style="max-width: 300px; line-height: 1.2; font-size: 1.2rem"
            >
              Claim your N20,000 Giveaway now. Download the
              <strong>440 Global Shopping</strong> app
            </p>
            <div class="d-flex align-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.get440.com&hl=en&gl=US"
                target="_blank"
              >
                <PlayStoreBadge width="120" />
              </a>
              <a
                href="https://apps.apple.com/ng/app/440/id6474253185"
                target="_blank"
                class="ml-2"
              >
                <AppStoreBadge width="120" />
              </a>
            </div>
          </div>
  </div>
</template>

<script>
import PlayStoreBadge from "@/components/icons/PlayStoreBadge.vue";
import AppStoreBadge from "@/components/icons/AppStoreBadge.vue";
export default {
components: { AppStoreBadge, PlayStoreBadge },
}
</script>

<style>

</style>