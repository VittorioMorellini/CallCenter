import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";

interface MyProps  {
    user: {
        name: string
    }
}
function MyComponent({user}: MyProps) {
    //const [name, setName] = useState<string>('')
    const [name, setName] = useState<string>('initial')
    const ref = useRef<HTMLAnchorElement>(null);

    const handleclick = () => {
        console.log('handle click')
        setName('Anan')
    }
    //setName(user.name)

    useEffect(() => {
        console.log('render');
        if (ref.current?.textContent === 'Anan') {
            setName('Andrew')
        }
        if (ref.current?.textContent === 'Andrew') {
            setName('Alex')
        }
        if (ref.current?.textContent === 'Alex') {
            setName('Adrian')
        }
    }, [name])
    

    return (
        <div style={{width: '100%'}}>
        {name &&
            <div style={{textAlign: 'center', position: 'absolute', top: '50%', right: '50%'}}>
                <br></br>
                <button onClick={handleclick}>Click</button>
                <br></br>
                <span ref={ref}>{name}</span>
            </div>
        }
        </div>
    );
}

export default MyComponent;