export default function InfoContainer({ children }) {
  return (
    <div className="flex flex-col justify-center bg-container px-8 w-[450px] h-[450px] rounded-[36px]">
      {children}
    </div>
  );
}
