'use client';

export default function GlobalLoading() {
    return (
        <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F9F7F2",
            zIndex: 9999
        }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
                {/* Minimalist Spinner */}
                <div style={{ position: "relative", width: "40px", height: "40px" }}>
                    <div style={{
                        boxSizing: "border-box",
                        display: "block",
                        position: "absolute",
                        width: "40px",
                        height: "40px",
                        border: "3px solid #31275c",
                        borderRadius: "50%",
                        animation: "spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
                        borderColor: "#31275c transparent transparent transparent"
                    }}></div>
                </div>

                <div style={{ textAlign: "center" }}>
                    <div style={{ width: "30px", height: "1px", background: "#31275c", margin: "0 auto 12px" }} />
                    <span style={{
                        fontFamily: "sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.5em",
                        color: "#2D2926",
                        display: "block"
                    }}>
                        Synthesizing
                    </span>
                    <span style={{
                        fontFamily: "sans-serif",
                        fontSize: "0.55rem",
                        color: "#999",
                        letterSpacing: "0.2em",
                        marginTop: "8px",
                        display: "inline-block"
                    }}>
                        Please Wait
                    </span>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}} />
        </div>
    );
}
