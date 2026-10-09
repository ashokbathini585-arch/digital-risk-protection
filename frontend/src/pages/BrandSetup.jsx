import { useState } from "react";

function BrandSetup() {
  const [brandName, setBrandName] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [appName, setAppName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [packageId, setPackageId] = useState("");
  const [logo, setLogo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      brandName,
      website,
      instagram,
      facebook,
      twitter,
      appName,
      developer,
      packageId,
      logo
    });

    alert("Brand profile saved successfully!");
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white p-6 md:p-10">
      <div className="max-w-4xl mx-auto">

        <div className="mb-8">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider">
            NEXORA
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Brand Profile
          </h1>

          <p className="text-gray-400 mt-2">
            Add your official brand information and trusted assets.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#0b1120] border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl"
        >

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Brand Name
            </label>

            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              required
              className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Official Logo
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
              className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 text-gray-300"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Official Website
            </label>

            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          <div className="border-t border-gray-800 pt-6 mt-6">
            <h2 className="text-xl font-semibold mb-5">
              Official Social Media Accounts
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Instagram
                </label>

                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Facebook
                </label>

                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  placeholder="/brand"
                  className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  X / Twitter
                </label>

                <input
                  type="text"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 mt-8">
            <h2 className="text-xl font-semibold mb-5">
              Official Mobile Application
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  App Name
                </label>

                <input
                  type="text"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Official app name"
                  className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Developer / Publisher
                </label>

                <input
                  type="text"
                  value={developer}
                  onChange={(e) => setDeveloper(e.target.value)}
                  placeholder="Official developer"
                  className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Package ID
                </label>

                <input
                  type="text"
                  value={packageId}
                  onChange={(e) => setPackageId(e.target.value)}
                  placeholder="com.company.app"
                  className="w-full bg-[#050816] border border-gray-700 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition rounded-lg py-3 font-semibold"
          >
            Save Brand Profile
          </button>

        </form>
      </div>
    </div>
  );
}

export default BrandSetup;