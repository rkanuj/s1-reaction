<script lang="ts">
  import { authApi, s1Api } from '@/api';
  import type { PostGenerateToken200Response } from '@/api/gen';
  import type { PostLogin200Response, PostLogout200Response } from '@/api/S1Api';
  import { needLogin, selectedUID, userInfoDict } from '@/store';
  import { justLogError } from '@/utils';
  import { deepCopy, responseErrorHandle } from 'shared';

  let username = '';
  let password = '';
  let questionid = '0';
  let answer = '';
  let exp: number | undefined;
  let errorMessage = '';

  let needReLogin = $needLogin;
  $: needReLogin = $needLogin;

  const resetForm = () => {
    username = '';
    password = '';
    questionid = '0';
    answer = '';
    exp = undefined;
    errorMessage = '';
  };

  const loginAndGenerateToken = async () => {
    if (!username || !password) {
      return '用户名或密码不能为空';
    }

    const loginResponse = await s1Api.postLogin(questionid && questionid !== '0' ? {
      username,
      password,
      questionid,
      answer,
    } : {
      username,
      password,
    }).catch(responseErrorHandle<PostLogin200Response>);

    if (!loginResponse.success) {
      return loginResponse.message || 'S1 登录接口失败';
    }

    const uid = parseInt(loginResponse.data.uid, 10);
    const sid = loginResponse.data.sid;
    username = loginResponse.data.username;
    exp = exp && exp > 0 ? exp : 0;

    const generateTokenResponse = await authApi.postGenerateToken({
      postGenerateTokenRequest: {
        uid,
        sid,
        exp,
      },
    }).catch(responseErrorHandle<PostGenerateToken200Response>).finally(async () => {
      const logoutResponse = await s1Api.postLogout({ sid }).catch(responseErrorHandle<PostLogout200Response>);
      if (!logoutResponse.success) {
        justLogError(logoutResponse.message || 'S1 登出接口失败');
      }
    });

    if (!generateTokenResponse.success) {
      return generateTokenResponse.message || '生成 Token 失败';
    }

    userInfoDict.update(dict => {
      const newDict = deepCopy(dict);
      newDict[uid] = {
        uid,
        username,
        auth: generateTokenResponse.result,
      };
      return newDict;
    });
    $selectedUID = uid;

    return null;
  };

  const onLoginBtnClick = async () => {
    const result = await loginAndGenerateToken();
    if (result !== null) {
      errorMessage = `账号登录失败：${ result }`;
      return;
    }

    needReLogin = false;
    resetForm();
  };
</script>

<div class="login">
  {#if !needReLogin}
    <button class="re-login-btn" on:click={() => {needReLogin = true}}>重新登录或登录新账号</button>
  {:else}
    {#if !$needLogin}
      <button class="re-login-btn" on:click={() => {needReLogin = false; resetForm();}}>退出登录</button>
    {/if}
    <div class="login-form">
      <input bind:value={username} name="username" placeholder="用户名" type="text"/>
      <input bind:value={password} name="password" placeholder="密码" type="password"/>
      <select bind:value={questionid} on:change={() => {answer = ''}}>
        <option value="0">安全提问（未设置请忽略）</option>
        <option value="1">母亲的名字</option>
        <option value="2">爷爷的名字</option>
        <option value="3">父亲出生的城市</option>
        <option value="4">您其中一位老师的名字</option>
        <option value="5">您个人计算机的型号</option>
        <option value="6">您最喜欢的餐馆名称</option>
        <option value="7">驾驶执照最后四位数字</option>
      </select>
      {#if questionid && questionid !== '0'}
        <input bind:value={answer} placeholder="答案" type="text">
      {/if}
      <input bind:value={exp} min="0" placeholder="Token 有效时长" type="number"/>
      <span class="tips">留空或 0 设为不过期（单位：秒）</span>
      <button on:click={onLoginBtnClick}>登录</button>
      {#if errorMessage}
        <span class="error-message">{errorMessage}</span>
      {/if}
    </div>
  {/if}
</div>

<style lang="scss">
  $form-width: 240px;

  .login {
    .re-login-btn {
      width: $form-width;

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }

    .login-form {
      display: flex;
      flex-direction: column;
      width: $form-width;

      > *:not(:last-child) {
        margin-bottom: 8px;
      }

      > input, select {
        padding: 4px;
        border: 1px solid lightgray;
      }

      .tips {
        font-size: 0.8em;
        color: dimgray;
      }

      .error-message {
        font-size: 0.8em;
        color: red;
      }
    }
  }
</style>
