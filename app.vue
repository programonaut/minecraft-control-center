<script setup lang="ts">
import "assets/css/main.css";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const isRunning = ref(true);
onMounted(async () => {
  const res = await useFetch("/api/status");
  isRunning.value = res.data.value?.isRunning ?? false;
});

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const loading = ref(false);
const onSubmit = form.handleSubmit(async (values) => {
  loading.value = true;
  const res = await useFetch("/api/poweron/" + values.username);

  if (res.status.value === "error") {
    // alert
    alert("something went wrong try again");
  }

  loading.value = false;
  isRunning.value = true;
});
</script>

<template>
  <!-- <Toaster /> -->
  <div class="h-full flex flex-col justify-center px-8">
    <form @submit.prevent="onSubmit" class="mx-auto w-full max-w-md space-y-2">
      <FormField name="username" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Your minecraft name"
              v-bind="componentField"
            />
          </FormControl>
          <FormDescription>
            The server is currently
            <span class="font-bold">{{
              loading ? "starting!" : isRunning ? "online!" : "offline!"
            }}</span>
          </FormDescription>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit" :disabled="isRunning || loading">
        Start the server
      </Button>
    </form>
  </div>
</template>
