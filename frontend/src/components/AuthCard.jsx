const AuthCard = ({ leftContent, rightContent }) => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-5xl bg-black rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 md:gap-12 shadow-lg">

                {/* LEFT */}
                <div className="flex-1 flex flex-col justify-center">
                    {leftContent}
                </div>

                {/* RIGHT */}
                <div className="flex-1 flex flex-col justify-center">
                    {rightContent}
                </div>

            </div>
        </div>
    );
};

export default AuthCard;