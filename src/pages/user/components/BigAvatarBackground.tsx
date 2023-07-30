interface Props {
  url: string;
}

export default function BigAvatarBackground(props: Props) {
  return (
    <div class="w-full aspect-ratio-[3/1] overflow-hidden">
      <img class="w-full -translate-y-1/3" src={props.url} alt="user_avatar" />
    </div>
  );
}
