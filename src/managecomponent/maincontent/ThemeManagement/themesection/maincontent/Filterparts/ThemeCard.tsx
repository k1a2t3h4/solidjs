import { For } from "solid-js";

interface ThemeCardProps {
  theme: any;
  onSelect: () => void;
}

export default function ThemeCard(props: ThemeCardProps) {
  return (
    <div
      class="border rounded-lg p-4 flex flex-col gap-2 hover:shadow cursor-pointer"
      onClick={props.onSelect}
    >
      <img
        src={props.theme.thumbnail}
        alt={props.theme.name}
        class="w-full h-32 object-cover rounded"
      />
      <div class="font-bold text-lg">{props.theme.name}</div>
      <div class="text-sm text-gray-600">{props.theme.description}</div>

      <div class="flex gap-2 flex-wrap">
        <For each={props.theme.categories}>
          {cat => <span class="bg-gray-200 text-xs px-2 py-0.5 rounded">{cat}</span>}
        </For>
      </div>

      <div class="flex gap-2 text-xs text-gray-500">
        <span>Price: ${props.theme.minprice} - ${props.theme.maxprice}</span>
        <span>Sales: {props.theme.numberofsalescount}</span>
        <span>
          Rating: {props.theme.rating}★ ({props.theme.reviewCount})
        </span>
      </div>
    </div>
  );
}
