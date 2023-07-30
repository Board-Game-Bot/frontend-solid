import { createEffect, createSignal, For, onMount } from 'solid-js';
import { Link, Outlet, useParams } from '@solidjs/router';
import { ContentBox } from '@/components/common';
import BigAvatarBackground from '@/pages/user/components/BigAvatarBackground';
import { userProfileApi } from '@/api/user';
import { useRequest } from '@/utils/util';

const options = ['页面一', '页面二', '页面三'];

export default function UserView() {
  // const { id } = useParams();
  const [data, error, isLoading, run] = useRequest(userProfileApi);

  onMount(() => {
    run();
  });

  const user = () => data().user;

  return (
    <ContentBox>
      {!isLoading() && (
        <>
          {data() && (
            <div class="w-full shdow-xl bg-white">
              <div class="w-full">
                <BigAvatarBackground url={user().avatar} />
              </div>
              <div class="w-full -translate-y-50% translate-x-10 flex">
                <div>
                  <img
                    class="w-[100px] rounded-full border-1 border-white border-dashed"
                    src={user().avatar}
                    alt="user_avatar"
                  />
                </div>
                <div>
                  <div class="h-50% pl-4 flex items-center">
                    <span class="text-3xl"> {user().name} </span>
                    <span class="pl-3">#{user().id}</span>
                  </div>
                  <div class="h-50% pl-5 text-xl font-thin">
                    这个用户没有任何的表示。
                  </div>
                </div>
              </div>
              <div class="w-full box-border px-2 py-2 flex gap-2">
                <For each={options}>
                  {(option) => (
                    <Link
                      href="#"
                      class="block text-black hover:bg-gray-2 rounded-md box-border px-3 py-1 cursor-pointer"
                    >
                      {option}
                    </Link>
                  )}
                </For>
              </div>
              <div class="w-full">
                <Outlet />
              </div>
            </div>
          )}
          {error() && (
            <div class="center full">
              <h1 class="text-7xl font-thin">获取用户信息失败</h1>
              <p>{error()}</p>
            </div>
          )}
        </>
      )}
      {!data() && !error() && (
        <div class="h-screen w-full center">
          <h1 class="font-thin">获取中.....</h1>
        </div>
      )}
    </ContentBox>
  );
}
