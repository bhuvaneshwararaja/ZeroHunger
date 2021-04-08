import "./style.css";
export default function NavBar(){
    return <>
        <nav>
            <div className="logo-sec">
                <img src="/images/zerohunger.png" alt="" />
                <h3 className="logo-heading">ZeroHunger</h3>
            </div>
            <div className="signin-sec">
                <a href="#login">signin</a>
                
            </div>
        </nav>
    </>
}