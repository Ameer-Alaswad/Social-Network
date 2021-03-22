import "./profilePicture.css";

export default function ProfilePicture({
    first,
    last,
    imageUrl,
    toggleUploader,
}) {
    imageUrl =
        imageUrl ||
        "https://www.edmundsgovtech.com/wp-content/uploads/2020/01/default-picture_0_0.png";
    return (
        <>
            <img id="profile-picture" src={imageUrl} alt={(first, last)} />
        </>
    );
}
