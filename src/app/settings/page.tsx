import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

type Props = {};

const SettingsPage = async (props: Props) => {
  const isPro = await checkSubscription();
  return (
    <div className="py-12 px-6 mx-auto max-w-5xl bg-gray-800 rounded-lg shadow-lg text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">Settings</h1>
      <div className="text-center mb-6">
        {isPro ? (
          <p className="text-xl text-white-400">
            You are a <span className="font-bold">Pro User</span>!
          </p>
        ) : (
          <p className="text-xl text-white-400">
            You are a <span className="font-bold">Free User</span>.
          </p>
        )}
      </div>

      <div className="flex justify-center mb-12">
        <SubscriptionButton isPro={isPro} />
      </div>

      {!isPro && (
        <div className="bg-gray-700 rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">
            Benefits of Becoming Pro
          </h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center space-x-3">
              <span className="text-white-400">•</span>
              <span>
                <span className="font-bold">More Tokens:</span> Access additional credits for performing actions on the platform.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-white-400">•</span>
              <span>
                <span className="font-bold">Early Access:</span> Get early access
                to new features, updates, or beta testing programs.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-white-400">•</span>
              <span>
                <span className="font-bold">Dedicated Support:</span> 24/7
                customer support.
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-white-400">•</span>
              <span>
                <span className="font-bold">Recognition:</span> Earn Pro badges that highlight your status within the community.
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
