<template>
  <section class="bg-gray-100 text-gray-700">
    <div class="container mx-auto p-2 md:p-4 lg:p-8">
      <div class="flex flex-col gap-4 md:flex-row">
        <img
          src="https://img.freepik.com/free-photo/close-up-hands-working-project_23-2148925541.jpg?w=900&t=st=1700242445~exp=1700243045~hmac=99e20f2edfbbe20b8f4a4c5a4034406a3b8dd1d4faf7c3b9f3d5ff90ea4e3c04"
          alt=""
          class="object-cover object-center rounded-lg shadow-lg md:w-1/2 lg:w-1/3"
        />

        <div class="space-y-4 md:w-1/2 lg:w-2/3">
          <p
            class="bg-yellow-600 text-gray-100 px-4 py-2 rounded-lg text-2xl font-bold uppercase text-center"
          >
            Electronics Engineering
          </p>

          <p class="indent-8">
            <strong class="text-blue-600 text-lg">Electronics Engineering</strong> Is a branch of
            engineering that integrates available and emerging technologies with knowledge of
            mathematics, natural, social and applied sciences to conceptualize, design, and
            implement new, improved, or innovative electronic, computer and communication systems,
            devices, goods, services and processes.
          </p>

          <p class="indent-8">
            An <strong class="text-blue-600 text-lg">Electronics Engineer</strong> is endowed with
            spiritual, moral, and ethical values, mindful of safety concerns and guided with
            responsibility to society and environment in the discharge of his function.
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto p-2 flex flex-col gap-8 md:p-4 lg:p-8 lg:flex-row">
      <div class="space-y-2 lg:w-3/5">
        <p class="text-green-600 text-lg font-semibold text-center md:text-left">Why choose ECE?</p>

        <p class="indent-8">
          Electronics Engineering is a compelling choice for those passionate about technology and
          innovation. It allows you to design, develop, and improve electronic systems that power
          our modern world, from smartphones to spacecraft. With a degree in Electronics
          Engineering, you can play a pivotal role in creating the next generation of devices,
          improving efficiency, and solving real-world challenges. It's a field that offers diverse
          career opportunities and the chance to be at the forefront of technological advancements.
        </p>

        <p class="indent-8">
          BS ECE is a rewarding and challenging field that offers a variety of career opportunities.
          With the right skills and experience, BS ECE graduates can achieve great success in this
          field.
        </p>
      </div>

      <div class="text-xs flex justify-center flex-wrap gap-2 lg:w-2/5">
        <p
          v-for="(item, index) in jobs"
          :key="index"
          class="border-violet-300 bg-violet-100 text-violet-500 w-max px-4 py-2 border rounded-full text-center"
        >
          {{ item }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
const jobs = [
  "Broadcasting",
  "Telecommunications",
  "Semiconductor Device Fabrication/ Manufacturing (Engineer)",
  "Electronics Design",
  "Computers Systems",
  "Instrumentation and Telemetry",
  "Automation, Feedback, Process Control, Robotics, and Mechatronics",
  "Industrial Electronics",
  "Signal Processing",
  "Optics",
  "Medical/Biomedical Electronics"
];
</script>
