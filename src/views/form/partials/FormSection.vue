<template>
  <section>
    <form
      v-if="isEligible"
      @submit.prevent="submitForm"
      class="container mx-auto p-2 space-y-4 md:p-4 lg:p-8"
    >
      <div
        class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border border-t-4 rounded-lg space-y-4"
      >
        <p class="text-blue-600 font-bold uppercase">General Information</p>

        <div class="grid gap-2.5">
          <div class="grid gap-1">
            <label for="form[0][0]">Age</label>
            <InputNumber v-model="form[0][0]" id="form[0][0]" required />
          </div>

          <div class="grid gap-1">
            <label for="form[0][1]">Sex</label>
            <select v-model="form[0][1]" id="form[0][1]" required>
              <option value="null" disabled selected></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div class="grid gap-1">
            <label for="form[0][2]">Civil status</label>
            <select v-model="form[0][2]" id="form[0][2]" required>
              <option value="null" disabled selected></option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Widowed">Widowed</option>
              <option value="Legally Separated">Legally Separated</option>
              <option value="Annulled">Annulled</option>
            </select>
          </div>

          <div class="grid gap-1">
            <label for="form[0][3]">Region of origin</label>
            <InputText v-model.trim="form[0][3]" id="form[0][3]" required />
          </div>
        </div>
      </div>

      <div
        class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border border-t-4 rounded-lg space-y-4"
      >
        <p class="text-blue-600 font-bold uppercase">Educational Background</p>

        <div class="grid gap-2.5">
          <div class="grid gap-1">
            <label for="form[1][0]">Year graduated</label>
            <select v-model="form[1][0]" id="form[1][0]" required>
              <option value="null" disabled selected></option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div class="grid gap-1">
            <label for="form[1][1]">Highest educational attainment</label>
            <select v-model="form[1][1]" id="form[1][1]" required>
              <option value="null" disabled selected></option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="Doctorate">Doctorate</option>
            </select>
          </div>

          <div>
            <label for="form[1][2]">Honors or awards received during college</label>
            <InputLongText v-model.trim="form[1][2]" id="form[1][2]" required />
          </div>

          <div>
            <label for="form[1][3]"
              >Reasons for taking or pursuing BSECE degree, and Eligibility</label
            >
            <InputLongText v-model="form[1][3]" id="form[1][3]" label="" required />
          </div>

          <div>
            <label for="form[1][4]">Competencies learned in college</label>
            <InputLongText v-model="form[1][4]" id="form[1][4]" required />
          </div>

          <div>
            <label for="form[1][5]">Training or advance studies attended after college</label>
            <InputLongText v-model="form[1][5]" id="form[1][5]" required />
          </div>

          <div>
            <label for="form[1][6]">Months/Years before first employment</label>
            <InputText v-model.trim="form[1][6]" id="form[1][6]" required />
          </div>
        </div>
      </div>

      <div
        class="border-gray-300 border-t-blue-600 bg-gray-100 text-gray-700 p-4 border border-t-4 rounded-lg space-y-4"
      >
        <p class="text-blue-600 font-bold uppercase">Employment Information</p>

        <div class="grid gap-2.5">
          <div class="grid gap-1">
            <label for="form[2][0]">Present occupation</label>
            <select v-model="form[2][0]" id="form[2][0]" required>
              <option value="null" disabled selected></option>
              <option value="Broadcasting">Broadcasting</option>
              <option value="Telecommunications">Telecommunications</option>
              <option value="Semiconductor Device Fabrication/ Manufacturing (Engineer)">
                Semiconductor Device Fabrication/ Manufacturing (Engineer)
              </option>
              <option value="Electronics Design">Electronics Design</option>
              <option value="Computers Systems">Computers Systems</option>
              <option value="Instrumentation and Telemetry">Instrumentation and Telemetry</option>
              <option value="Automation, Feedback, Process Control, Robotics, and Mechatronics">
                Automation, Feedback, Process Control, Robotics, and Mechatronics
              </option>
              <option value="Industrial Electronics">Industrial Electronics</option>
              <option value="Signal Processing">Signal Processing</option>
              <option value="Optics">Optics</option>
              <option value="Medical/Biomedical Electronics">Medical/Biomedical Electronics</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div class="grid gap-1">
            <label for="form[2][1]">Employment status</label>
            <select v-model="form[2][1]" id="form[2][1]" required>
              <option value="null" disabled selected></option>
              <option value="Contract Employee">Contract Employee</option>
              <option value="Full-Time Employee">Full-Time Employee</option>
              <option value="Independent Contractor">Independent Contractor</option>
              <option value="Intern or Apprentice">Intern or Apprentice</option>
              <option value="Part-Time Employee">Part-Time Employee</option>
              <option value="Self-Employed">Self-Employed</option>
              <option value="Temporary or Seasonal Employee">Temporary or Seasonal Employee</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>

          <div>
            <label for="form[2][2]">Salary level</label>
            <InputText v-model.trim="form[2][2]" id="form[2][2]" />
          </div>

          <div>
            <label for="form[2][3]">Place of work</label>
            <InputText v-model.trim="form[2][3]" id="form[2][3]" required />
          </div>

          <div>
            <label for="form[2][4]">Name of company</label>
            <InputText v-model.trim="form[2][4]" id="form[2][4]" required />
          </div>

          <div>
            <label for="form[2][5]">Reasons for staying on the job</label>
            <InputLongText v-model.trim="form[2][5]" id="form[2][5]" />
          </div>

          <div>
            <label for="form[2][6]">Years of first employment after graduation</label>
            <InputNumber v-model.trim="form[2][6]" id="form[2][6]" required />
          </div>

          <div>
            <label for="form[2][7]">Reasons for changing the job</label>
            <InputLongText v-model.trim="form[2][7]" id="form[2][7]" />
          </div>

          <div>
            <label for="form[2][8]">Medium or channel used for job search</label>
            <InputText v-model.trim="form[2][8]" id="form[2][8]" required />
          </div>

          <div>
            <label for="form[2][9]"
              >Awards and recognition received after college/during employment</label
            >
            <InputText v-model.trim="form[2][9]" id="form[2][9]" required />
          </div>

          <div>
            <label for="form[2][10]"
              >Employer’s feedback and evaluation of the individual employees’ performance</label
            >
            <InputLongText v-model.trim="form[2][10]" id="form[2][10]" required />
          </div>

          <div>
            <label for="form[2][11]">Certifications/Training/Skill needs of employer</label>
            <InputText v-model.trim="form[2][11]" id="form[2][11]" />
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </div>
    </form>

    <div v-else class="container mx-auto p-2 text-center md:p-4 lg:p-8">
      <p>Thank you for trying to fill out the form but you have already submitted one!</p>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useGetForms, useCreateForm } from "@/firebase/forms";
import { useGetProfile } from "@/firebase/profile";

import InputNumber from "@/components/InputNumber.vue";
import InputText from "@/components/InputText.vue";
import InputLongText from "@/components/InputLongText.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";

const getFormsResponse = await useGetForms();
const getFormsResult = getFormsResponse.map((key) => key.id);
const getProfileResponse = await useGetProfile();
const getProfileResult = getProfileResponse.map((key) => key.id);
const isEligible = ref(!getFormsResult.includes(getProfileResult[0]));
const isLoading = ref(false);

const form = reactive({
  0: {
    0: null,
    1: "null",
    2: "null",
    3: null
  },

  1: {
    0: "null",
    1: "null",
    2: null,
    3: null,
    4: null,
    5: null,
    6: null
  },

  2: {
    0: "null",
    1: "null",
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
    10: null,
    11: null
  }
});

const submitForm = async () => {
  isLoading.value = true;

  const validateForm = (form) => {
    let hasInvalidValue = false;

    for (const key in form) {
      for (const subKey in form[key]) {
        const value = form[key][subKey];

        if (value === null || value === "null") {
          hasInvalidValue = true;
          break;
        }
      }
    }

    return hasInvalidValue;
  };

  const hasInvalidValue = validateForm(form);

  if (hasInvalidValue) {
    isLoading.value = false;
    alert("Fill out all forms");
  } else {
    const createFormResponse = await useCreateForm(form);
    const createFormResult = createFormResponse.code;

    if (createFormResult === 201) {
      isLoading.value = false;
      isEligible.value = !isEligible.value;
    }
  }
};
</script>

<style lang="postcss" scoped>
:is(label) {
  @apply text-sm;
}

:is(select) {
  @apply border-gray-400 bg-gray-100 w-full rounded-lg appearance-none truncate;
}

:is(select option:not([value="null"])) {
  @apply text-gray-700;
}
</style>
