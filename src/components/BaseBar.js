import React from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Link from "@material-ui/core/Link"

export default function FooterBar() {
    return (
        <div>
            <Toolbar
                variant="dense"
                position="static"
                style={{ top: "auto", bottom: 0, left: "40%", alignItems: "center" }}
            >
                <div>
                    {" "}
                    Powered by{" "}
                    <Link target="_blank" rel="noopener" color="primary" href="http://darksky.com">
                        {" "}
                        DarkSky
                    </Link>
                    ,{" "}
                    <Link target="_blank" rel="noopener" color="primary" href="https://unsplash.com/">
                        {" "}
                        Unsplash
                    </Link>
                    , and{" "}
                    <Link
                        target="_blank"
                        rel="noopener"
                        color="primary"
                        href="https://developers.google.com/maps/documentation"
                    >
                        {" "}
                        Google Maps
                    </Link>
                </div>
            </Toolbar>
            {/* </AppBar> */}
        </div>
    )
}
