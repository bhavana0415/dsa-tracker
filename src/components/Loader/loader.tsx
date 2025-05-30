export default function Loader({ isLoading }: { isLoading: boolean }) {
    if (!isLoading) {
        return null;
    }
    return (
        <div
            style={{
                position: "fixed",
                height: "100vh",
                width: "100vw",
                top: "0",
                left: "0",
                zIndex: 9999,
                backgroundColor: "#092635",
            }}
            className="flex flex-col justify-center items-center">
            <div className="flex-col gap-4 w-full flex items-center justify-center">
                <div
                    className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                >
                    <div
                        className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                    ></div>
                </div>
            </div>
        </div>

    );
}
