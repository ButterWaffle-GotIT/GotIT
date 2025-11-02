import { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "nativewind",
    "react-native-web",
  ],
};
export default nextConfig;
