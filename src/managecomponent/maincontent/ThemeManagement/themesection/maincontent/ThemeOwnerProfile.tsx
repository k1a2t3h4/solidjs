import { useThemeContext } from "../../../../../contexts/ThemeContext";

export default function ThemeOwnerProfile() {
  const { selectedProfile, SelectedThemeDetail, activeSection } = useThemeContext();

  // Guard: don’t render if null or wrong section
  if (!selectedProfile() || activeSection() !== "otherProfile") return null;

  // Assert non-null (safe after guard)
  const profile = selectedProfile()!;

  return (
    <div class="max-w-3xl mx-auto p-6">
      {/* Profile Header */}
      <div class="flex items-center gap-6 mb-6">
        <img
          src={profile.profileImage}
          alt={profile.name}
          class="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
        />
        <div>
          <div class="text-2xl font-bold">{profile.name}</div>
          <div class="text-gray-500 text-sm mb-1">@{profile.id}</div>
          <div class="text-gray-700 mb-2">{profile.bio}</div>
          <div class="flex gap-4 text-xs text-gray-600">
            <span>{profile.followers.length} followers</span>
            <span>{profile.following.length} following</span>
            <span>{profile.themes.length} themes</span>
            <span>Experience: {profile.experience}</span>
          </div>
        </div>
      </div>

      {/* Themes List */}
      <div class="mb-6">
        <h4 class="font-semibold mb-2">Themes</h4>
        <div class="flex gap-3 flex-wrap">
          {profile.themes.map((theme) => (
            <button
              class="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 border border-gray-200 text-sm font-medium"
              onClick={() => SelectedThemeDetail(theme.id)}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div class="mb-6">
        <h4 class="font-semibold mb-2">Posts</h4>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          {profile.posts.map((post, idx) =>
            post.type === "image" ? (
              <img
                src={post.url}
                alt={`Post ${idx + 1}`}
                class="w-full h-32 object-cover rounded"
              />
            ) : (
              <video
                src={post.url}
                controls
                class="w-full h-32 object-cover rounded"
              />
            )
          )}
        </div>
      </div>

      {/* Basic Info */}
      <div class="bg-gray-50 rounded p-4 text-xs text-gray-700">
        <div>Date of Birth: {profile.dob}</div>
        <div>Account Created: {profile.accountCreated}</div>
        <div>Age: {profile.age}</div>
      </div>
    </div>
  );
}
