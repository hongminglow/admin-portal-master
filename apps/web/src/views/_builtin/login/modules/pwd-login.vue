<script setup lang="ts">
import { computed, reactive, ref, onMounted } from "vue";
import { loginModuleRecord } from "@/constants/app";
import { useAuthStore } from "@/store/modules/auth";
import { useRouterPush } from "@/hooks/common/router";
import { useFormRules, useNaiveForm } from "@/hooks/common/form";
import { $t } from "@/locales";
import { fetchLoginCaptcha } from "@/service/api";

defineOptions({
  name: "PwdLogin",
});

const authStore = useAuthStore();
const { toggleLoginModule } = useRouterPush();
const { formRef, validate } = useNaiveForm();

interface FormModel {
  userName: string;
  password: string;
  verifyCode: string;
  captchaId: string;
}

const model: FormModel = reactive({
  userName: "admin",
  password: "a123456",
  verifyCode: "",
  captchaId: "",
});

const captchaImg = ref("");
const captchaLoading = ref(false);

async function loadCaptcha() {
  try {
    captchaLoading.value = true;
    const { data } = await fetchLoginCaptcha({ width: 120, height: 40 });
    if (data) {
      model.captchaId = data.id;
      captchaImg.value = data.img;
    }
  } catch (error) {
    console.error("Failed to load captcha:", error);
    window.$notification?.error({
      title: "Captcha Error",
      content: "Failed to load captcha. Please try again.",
      duration: 3000,
    });
  } finally {
    captchaLoading.value = false;
  }
}

onMounted(loadCaptcha);

const rules = computed<Partial<Record<keyof FormModel, App.Global.FormRule[]>>>(
  () => {
    // inside computed to make locale reactive, if not apply i18n, you can define it without computed
    const { formRules } = useFormRules();

    return {
      userName: formRules.userName,
      password: formRules.pwd,
      verifyCode: [
        { required: true, message: "Please enter captcha code" },
        { min: 4, max: 6, message: "Captcha must be 4-6 characters" },
      ],
    };
  },
);

async function handleSubmit() {
  try {
    await validate();
    await authStore.login(
      model.userName,
      model.password,
      model.verifyCode,
      model.captchaId,
    );
  } catch (error) {
    console.error("Login error:", error);
    // Error is already handled in auth store, but we can add custom handling here if needed
  }
}

type AccountKey = "super" | "admin" | "user";

interface Account {
  key: AccountKey;
  label: string;
  userName: string;
  password: string;
}

const accounts = computed<Account[]>(() => [
  {
    key: "super",
    label: $t("page.login.pwdLogin.superAdmin"),
    userName: "Super",
    password: "123456",
  },
  {
    key: "admin",
    label: $t("page.login.pwdLogin.admin"),
    userName: "Admin",
    password: "123456",
  },
  {
    key: "user",
    label: $t("page.login.pwdLogin.user"),
    userName: "User",
    password: "123456",
  },
]);

async function handleAccountLogin(account: Account) {
  try {
    // Load fresh captcha before account login
    await loadCaptcha();

    await authStore.login(
      account.userName,
      account.password,
      model.verifyCode,
      model.captchaId,
    );
  } catch (error) {
    console.error("Account login error:", error);
    // Error is already handled in auth store
  }
}
</script>

<template>
  <NForm
    ref="formRef"
    :model="model"
    :rules="rules"
    size="large"
    :show-label="false"
    @keyup.enter="handleSubmit"
  >
    <NFormItem path="userName">
      <NInput
        v-model:value="model.userName"
        :placeholder="$t('page.login.common.userNamePlaceholder')"
      />
    </NFormItem>
    <NFormItem path="password">
      <NInput
        v-model:value="model.password"
        type="password"
        show-password-on="click"
        :placeholder="$t('page.login.common.passwordPlaceholder')"
      />
    </NFormItem>
    <NFormItem path="verifyCode">
      <div class="flex items-center gap-8px w-full">
        <NInput v-model:value="model.verifyCode" placeholder="Captcha" />
        <div
          class="h-40px w-120px flex items-center justify-center border border-gray-300 rounded cursor-pointer relative"
          @click="loadCaptcha"
        >
          <img
            v-if="captchaImg && !captchaLoading"
            :src="captchaImg"
            alt="captcha"
            class="h-full w-full object-contain"
          />
          <NSpin v-if="captchaLoading" size="small" />
          <span
            v-if="!captchaImg && !captchaLoading"
            class="text-gray-400 text-12px"
          >
            Click to load
          </span>
        </div>
      </div>
    </NFormItem>
    <NSpace vertical :size="24">
      <div class="flex-y-center justify-between">
        <NCheckbox>{{ $t("page.login.pwdLogin.rememberMe") }}</NCheckbox>
        <NButton quaternary @click="toggleLoginModule('reset-pwd')">
          {{ $t("page.login.pwdLogin.forgetPassword") }}
        </NButton>
      </div>
      <NButton
        type="primary"
        size="large"
        round
        block
        :loading="authStore.loginLoading"
        @click="handleSubmit"
      >
        {{ $t("common.confirm") }}
      </NButton>
      <div class="flex-y-center justify-between gap-12px">
        <NButton class="flex-1" block @click="toggleLoginModule('code-login')">
          {{ $t(loginModuleRecord["code-login"]) }}
        </NButton>
        <NButton class="flex-1" block @click="toggleLoginModule('register')">
          {{ $t(loginModuleRecord.register) }}
        </NButton>
      </div>
      <NDivider class="text-14px text-#666 !m-0">{{
        $t("page.login.pwdLogin.otherAccountLogin")
      }}</NDivider>
      <div class="flex-center gap-12px">
        <NButton
          v-for="item in accounts"
          :key="item.key"
          type="primary"
          @click="handleAccountLogin(item)"
        >
          {{ item.label }}
        </NButton>
      </div>
    </NSpace>
  </NForm>
</template>

<style scoped></style>
