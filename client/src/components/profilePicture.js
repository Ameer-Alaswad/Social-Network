import "./profilePicture.css";

export default function ProfilePicture({ first, last, imageUrl }) {
    imageUrl =
        imageUrl ||
        "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png";
    return (
        <div>
            <img id="profile-picture" src={imageUrl} alt={(first, last)} />
        </div>
    );
}
