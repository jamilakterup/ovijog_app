
function SideNav({ isOpen }) {
  return (
    <div className={`bg-slate-400 dark:bg-slate-900 absolute top-18 left-0 min-h-full transition-all ease-in-out ${isOpen ? "w-16 overflow-hidden" : "w-[200px]"}`}>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque eos molestiae optio placeat minus voluptas obcaecati, asperiores mollitia magnam! Saepe mollitia quod iure nesciunt dolores unde optio delectus cum ea?
    </div>
  )
}

export default SideNav;
