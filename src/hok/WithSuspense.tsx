import React, {ComponentType} from "react";
import Preloader from "../components/Common/Preloader/Preloader";

export function WithSuspense<T>(Component: ComponentType<T>) {

    return (props: T) => {
        return <React.Suspense fallback={<Preloader/>}>
            <Component {...props}/>
        </React.Suspense>
    }
}