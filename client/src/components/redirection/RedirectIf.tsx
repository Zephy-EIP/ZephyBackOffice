import { useRouter } from "next/router";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode
    fct: () => boolean;
    url: string;
};

export default function RedirectIf(props: Props) {
    const router = useRouter();
    if (props.fct() === false) {
        useEffect(() => {
            router.push(props.url);
        })
        return (<></>);
    }
    return (
        <>
            {props.children}
        </>
    );
}
