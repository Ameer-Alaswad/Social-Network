import ProfilePicutre from "./profilePicture";
import BioEditer from "./bioEditer";
import "./profile.css";

export default function Profile({
    first,
    last,
    imageUrl,
    bio,
    toggleUploader,
    updateBio,
}) {
    // console.log(
    //     `first,last,imageUrl,bio`,
    //     first,
    //     last,
    //     imageUrl,
    //     bio,
    //     updateBio
    // );
    return (
        <div className="profile-container">
            <div onClick={toggleUploader} className="profile-pic-container">
                <ProfilePicutre
                    first={first}
                    last={last}
                    imageUrl={imageUrl}
                    toggleUploader={() => this.toggleUploader()}
                />
            </div>
            <BioEditer updateBio={updateBio} first={first} bio={bio} />
        </div>
    );
}
