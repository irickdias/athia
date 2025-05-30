import ChangeThemeButton from "../ChangeThemeButton";

export default function Header() {
    return(
        <section className="w-full h-[8vh]">
            <div className="w-full h-full flex justify-between items-center pl-6.5 pr-6.5">
                <div className="text-3xl text-primary dark:text-primary-light">
                    <p>ATHIA</p>
                </div>
                <div className="text-lg">
                    <ChangeThemeButton/>
                </div>
            </div>
        </section>
    );
}