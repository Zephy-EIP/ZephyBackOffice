import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode
    fct: () => boolean;
    url: string;
};

export default function RedirectIf(props: Props) {
    const router = useRouter();
    const [check, setCheck] = useState(false);
    useEffect(() => {
        if (props.fct() === false) {
            router.push(props.url);
            return;
        }
        setCheck(true);
    })
    if (check)
        return (<></>);
    return (
        <>
            {props.children}
        </>
    );
}
