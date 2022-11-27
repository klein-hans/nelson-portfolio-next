export function Input({ ...props }) {
  return (
    <>
      {props.type !== "textarea" ? (
        <input
          type={props.type}
          id={props.id}
          className="border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          placeholder={props.placeholder}
          name={props?.name}
          value={props?.value}
          onChange={props?.onChange}
        />
      ) : (
        <textarea
          className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          id={props.id}
          placeholder={props.placeholder}
          name={props?.name}
          rows={props?.rows}
          cols={props?.cols}
          value={props?.value}
          onChange={props?.onChange}
        ></textarea>
      )}
    </>
  );
}
