


export default function Avatar({width= 8, image_url}) {

    const size = width * 0.25;
    const fontSize = size * 0.5;

    return(
        <div
            style={{ width: `${size}rem`, height: `${size}rem`, fontSize: `${fontSize}rem` }}
            className="rounded-full bg-emerald-500 text-white flex items-center justify-center"
        >
            B
        </div>
    )
}