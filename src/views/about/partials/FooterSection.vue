<template>
  <section class="bg-blue-600 text-gray-100 p-2">
    <footer class="max-w-screen-xl mx-auto p-2 space-y-4 lg:space-y-8">
      <div class="space-y-4 md:w-max md:mx-auto md:flex md:items-center md:gap-12 lg:items-start">
        <div class="space-y-4 lg:flex lg:items-start lg:gap-12">
          <div>
            <img src="@/assets/images/UrsLogo.png" alt="" class="w-10 mx-auto" />

            <p class="text-lg font-bold uppercase text-center">Tracer Study Portal</p>

            <ul class="text-sm capitalize flex justify-center gap-2">
              <li
                v-for="(route, index) in routes.filter((key) =>
                  true ? key.requiresAuthentication === false : key
                )"
                :key="index"
              >
                <RouterLink :to="{ name: route.name }">
                  {{ route.name }}
                </RouterLink>
              </li>
            </ul>
          </div>

          <div class="space-y-2">
            <p class="text-center font-medium uppercase">Social media</p>

            <div class="flex justify-center gap-2">
              <a href="" class="bg-gray-100 aspect-square p-2 rounded-lg grid place-items-center">
                <img src="@/assets/images/UrsLogo.png" alt="" width="16" height="16" />
              </a>

              <a href="" class="bg-gray-100 aspect-square p-2 rounded-lg grid place-items-center">
                <img
                  src="https://asset.brandfetch.io/idpKX136kp/id4P3q9qSr.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </a>

              <a href="" class="bg-gray-100 aspect-square p-2 rounded-lg grid place-items-center">
                <img
                  src="https://asset.brandfetch.io/idVfYwcuQz/id5E8NIYoL.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </a>

              <a href="" class="bg-gray-100 aspect-square p-2 rounded-lg grid place-items-center">
                <img
                  src="https://asset.brandfetch.io/idS5WhqBbM/id-opmlNbH.svg"
                  alt=""
                  width="16"
                  height="16"
                />
              </a>
            </div>
          </div>
        </div>

        <div class="grid place-items-center gap-2">
          <p class="text-center font-medium uppercase">Contact Information</p>

          <div class="text-sm space-y-1">
            <div class="flex items-center gap-2">
              <PhoneIcon />
              <p>01234567890</p>
            </div>

            <div class="flex items-center gap-2">
              <LocationIcon />
              <p class="grid sm:gap-2 sm:grid-flow-col">
                <span>J. Sumulong St. Barangay San Juan,</span>
                <span>Morong, Philippines</span>
              </p>
            </div>

            <div class="flex items-center gap-2">
              <EnvelopeIcon />
              <p>studentadmission.morong@urs.edu.ph</p>
            </div>

            <div class="flex items-center gap-2">
              <LinkIcon />
              <p>www.urs.edu.ph/admission-enrollment</p>
            </div>
          </div>
        </div>
      </div>

      <p class="text-sm text-center">© 2023 Tracer Study Portal. All rights reserved.</p>
    </footer>
  </section>
</template>

<script setup>
import { RouterLink } from "vue-router";

import PhoneIcon from "@/assets/icons/PhoneIcon.vue";
import EnvelopeIcon from "@/assets/icons/EnvelopeIcon.vue";
import LocationIcon from "@/assets/icons/LocationIcon.vue";
import LinkIcon from "@/assets/icons/LinkIcon.vue";

const routes = [
  {
    name: "home",
    requiresAuthentication: false
  },
  {
    name: "gallery",
    requiresAuthentication: false
  },
  {
    name: "graduates",
    requiresAuthentication: false
  },
  {
    name: "about",
    requiresAuthentication: false
  },
  {
    name: "form",
    requiresAuthentication: true
  },
  {
    name: "profile",
    requiresAuthentication: true
  }
];
</script>
