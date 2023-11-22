<template>
  <section>
    <div class="container mx-auto p-2 space-y-4 md:p-4 lg:p-8">
      <div
        class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border border-t-4 rounded-lg space-y-4"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-blue-600 font-bold uppercase">Personal Information</p>
            <p class="text-xs">
              Keep your information up-to-date. Make sure your profile reflects your current status.
            </p>
          </div>

          <div class="flex gap-2">
            <PrimaryButton>Update personal information</PrimaryButton>
            <PrimaryButton>Change password</PrimaryButton>
          </div>
        </div>

        <div class="px-4 flex gap-8">
          <div class="flex flex-col gap-2">
            <img
              src="https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/357203077_2509728879194098_204956894696360182_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeG_Ac1DF6cqa-HNMmAyOnfnZQ-vy7YlX1VlD6_LtiVfVT5LntKeFToBU4-WjIU7KVJ7S49dhqAFMtisykRg2V2U&_nc_ohc=4ZOYPWjzYKgAX9grtD6&_nc_ht=scontent.fmnl3-2.fna&oh=00_AfB7545o_mSn5cVxvfe6iPz-AMAvOguw4d88BZAhjdLomw&oe=655F4B49"
              alt=""
              class="w-48 rounded-lg object-cover"
            />

            <PrimaryButton>Select new photo</PrimaryButton>
          </div>

          <div class="flex-1 grid gap-2.5">
            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">First name</p>
              <p class="text-gray-800">Mon Albert</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">Middle Name</p>
              <p class="text-gray-800">Loayon</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">Last Name</p>
              <p class="text-gray-800">Gamil</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">Email address</p>
              <p class="text-gray-800">mrgamilmonalbert@gmail.com</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">Birthday</p>
              <p class="text-gray-800">October 17, 2000</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">Year Graduated</p>
              <p class="text-gray-800">2023</p>
            </div>

            <div class="border-gray-300 bg-gray-200 text-gray-500 px-4 py-2 border rounded-lg">
              <p class="text-xs font-semibold">Field of Work</p>
              <p class="text-gray-800">Computers Systems</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import PrimaryButton from "@/components/PrimaryButton.vue";
</script>
