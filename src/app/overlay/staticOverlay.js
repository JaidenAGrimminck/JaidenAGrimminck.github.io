// import image from public/noise
import image from "../../../public/noise.png"


export default function StaticOverlay() {
    return (
        <div className="pointer-events-none fixed inset-0 z-10000 h-full w-full opacity-5" style={{ backgroundImage: `url(${image.src})`, backgroundRepeat: 'repeat', backgroundSize: 'calc(716px / 1.1) calc(832px / 1.1)' }}>
            <div className="absolute inset-0 bg-black opacity-7" />

        </div>
    )
};