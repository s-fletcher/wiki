import { useEffect } from "react";
import Router from "next/router";

export default function useWarnIfUnsavedChanges(unsavedChanges) {
    const message = "Are you sure you want to leave? You will lose unsaved data.";

    useEffect(() => {
        const routeChangeStart = (url) => {
            if (Router.asPath !== url && unsavedChanges && !confirm(message)) {
                Router.events.emit("routeChangeError");
                Router.replace(Router, Router.asPath);
                throw "Abort route change. Please ignore this error.";
            }
        };

        const beforeunload = (e) => {
            if (unsavedChanges) {
                e.preventDefault();
                e.returnValue = message;
                return message;
            }
        };

        window.addEventListener("beforeunload", beforeunload);
        Router.events.on("routeChangeStart", routeChangeStart);

        return () => {
            window.removeEventListener("beforeunload", beforeunload);
            Router.events.off("routeChangeStart", routeChangeStart);
        };
    }, [unsavedChanges]);
}
