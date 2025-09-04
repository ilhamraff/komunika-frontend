export default function EmptyActiveRoom() {
  return (
    <main id="Main-Content-Container" className="relative flex flex-1">
      <div className="ornaments absolute inset-0 overflow-hidden">
        <img
          src="/assets/images/backgrounds/ornament.png"
          className="absolute bottom-0 h-[300px] -left-[270px]"
          alt="ornament"
        />
        <img
          src="/assets/images/backgrounds/ornament.png"
          className="absolute top-0 h-[320px] -right-[249px] rotate-180"
          alt="ornament"
        />
      </div>
      <div className="relative m-auto flex flex-col items-center text-center w-fit h-fit gap-6">
        <img
          src="/assets/images/icons/message-text-blue-transparent-bg.svg"
          className="flex size-[120px] shrink-0"
          alt="icon"
        />
        <div>
          <p className="font-semibold text-xl leading-[25px]">
            No chat to display.
          </p>
          <p className="font-medium leading-5 text-heyhao-secondary mt-2">
            Tap on a message to view the chat.
          </p>
        </div>
      </div>
    </main>
  );
}
