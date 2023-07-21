import { AiOutlineUser } from 'solid-icons/ai';
import Modal from '@/components/Modal';
import { createSignal } from 'solid-js';
import Input from '@/components/Input';
import { getFormData, handleResponseError } from '@/utils/util';
import RadioGroup from '@/components/RadioGroup';
import {
  authLoginApi,
  AuthLoginDto,
  authRegisterApi,
  AuthRegisterDto,
} from '@/api/auth';
import { setJwt, setUser, User } from '@/store/user';
import { ResponseError } from '@/api';

export default function AuthButton() {
  const [modalVisible, setModalVisible] = createSignal(false);

  function onClick() {
    setModalVisible(true);
  }

  function succeedAuth(user: User, jwt: string) {
    setUser({
      ...user,
      loginStatus: 'login',
    });
    setJwt(jwt);
    setModalVisible(false);
  }

  async function register(data: AuthRegisterDto) {
    try {
      const resp = await authRegisterApi(data);
      const { user, jwt } = resp.data;
      succeedAuth(user, jwt);
    } catch (e) {
      handleResponseError(e as ResponseError);
    }
  }

  async function login(data: AuthLoginDto) {
    try {
      const resp = await authLoginApi(data);
      const { user, jwt } = resp.data;
      succeedAuth(user, jwt);
    } catch (e) {
      handleResponseError(e as ResponseError);
    }
  }

  const handleFormSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (type() === 'register') {
      register(getFormData(e) as AuthRegisterDto);
    } else if (type() === 'login') {
      login(getFormData(e) as AuthLoginDto);
    }
  };

  const [type, setType] = createSignal('login');

  const handleTypeChange = (v: string) => {
    setType(v);
  };

  function handleModalClickOutside() {
    setModalVisible(false);
  }

  return (
    <>
      <div
        class="cursor-pointer absolute right-4 rounded-md w-[100px] h-[50px] text-slate-300 hover:text-slate-200 hover:bg-slate-500 px-2 flex items-center select-none"
        onClick={onClick}
      >
        <AiOutlineUser class="w-[40px] h-[40px] text-slate-300" />
        <span class="ml-2 text-xl font-bold">登录</span>
      </div>
      <Modal
        onClickOutside={handleModalClickOutside}
        visible={modalVisible()}
        title="注册 & 登录"
      >
        <h1 class="mx-auto w-fit text-black">This is a Logo</h1>
        <form
          onSubmit={handleFormSubmit}
          class="box-border px-4 w-[400px] text-black"
        >
          <RadioGroup
            class="m-auto"
            field="type"
            onChange={handleTypeChange}
            defaultValue={type()}
            options={[
              { label: '登录', value: 'login' },
              { label: '注册', value: 'register' },
            ]}
          />
          <Input class="w-full" label="账户" field="account" />
          <Input class="w-full" label="密码" type="password" field="passwd" />
          <div>
            <div>
              <input id="remember" type="checkbox" name="remember" />
              <label for="remember">保持半个月</label>
            </div>
          </div>
          <div class="py-5 flex justify-end">
            <button class="text-white text-2xl px-2 py-1 cursor-pointer border-0 rounded-md bg-slate-600 hover:bg-slate-700">
              {type() === 'register' ? '注册' : '登录'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
