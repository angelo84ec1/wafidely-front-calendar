<script setup lang="ts">
import { ref, watch } from "vue";
import {
    Dialog,
    DialogPanel,
    TransitionRoot,
    TransitionChild,
} from "@headlessui/vue";

const modalOpen = ref<boolean>(true)
const videoRef = ref<HTMLVideoElement | null>(null)

watch(videoRef, () => {
    videoRef.value?.play()
})
</script>



<template>
    <div>

  

        <TransitionRoot :show="modalOpen" as="template">
            <Dialog :initialFocus="videoRef" @close="modalOpen = false">

                <!-- Modal backdrop -->
                <TransitionChild
                    className="fixed inset-0 z-[99999] bg-black bg-opacity-50 transition-opacity"
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition ease-out duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    aria-hidden="true"
                />
                <!-- End: Modal backdrop -->

                <!-- Modal dialog -->
                <TransitionChild
                    className="fixed inset-0 z-[99999] flex p-6"
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0 scale-75"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-out duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-75"
                >
               
                    <div class="max-w-5xl mx-auto h-full flex items-center">
                        <DialogPanel class="w-full max-h-full rounded-3xl shadow-2xl aspect-video bg-black overflow-hidden">
                            <video ref="videoRef" class="d-block w-100"  autoplay loop controls>
                                <source src="https://amc-audios-bucket.s3.amazonaws.com/VIDEO+AMC+.mp4" width="1920" height="1080" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </DialogPanel>
                    </div>
                    <button @click="modalOpen = false" class="absolute top-0 right-14 mt-4 mr-4 p-2 bg-white rounded-full shadow-md z-50">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>


               
                </TransitionChild>
                <!-- End: Modal dialog -->

            </Dialog>
        </TransitionRoot>

    </div>
</template>
