


export default function Avatar({width=8, imageUrl, showPresenceIcon=true}) {

    const size = width * 0.25;
    const fontSize = size * 0.5;

    const presenceIconSize = size * 0.35;
    const borderSize = presenceIconSize / 6;

    return(
        <div
            style={{ width: `${size}rem`, height: `${size}rem`, fontSize: `${fontSize}rem` }}
            className="relative rounded-full bg-emerald-500 text-white flex items-center justify-center"
        >
            B
            
            {/* TODO implement presence icon logic */}
            {showPresenceIcon && (
                <div
                    style={{ width: `${presenceIconSize}rem`, height: `${presenceIconSize}rem`, borderWidth:`${borderSize}rem` }}
                    className="absolute bottom-0 right-0 rounded-full bg-yellow-500 border-neutral-800"
                />
            )}
        </div>
    )
}