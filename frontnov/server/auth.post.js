export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const runtimeConfig = useRuntimeConfig();
  
    try {
      await $fetch(`${runtimeConfig.public.apiBase}/login`, {
        method: "POST",
        body: { username: body.username, password: body.password },
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw createError({
        message: "Authorization Failed",
        statusCode: 401,
      });
    }
  
    return {
      message: "success",
    };
  });