import loader from "../assets/Loading_Animation_3_clip.webm";
function FullScreenLoader() {
    return (
        <div className="flex h-screen items-center justify-center bg-primary-100">
            <video
                autoPlay
                muted
                playsInline
                className="w-52 object-contain sm:w-48 md:w-60 lg:w-72 xl:w-96"
                src={loader}
            />
        </div>
    );
}

export default FullScreenLoader;
