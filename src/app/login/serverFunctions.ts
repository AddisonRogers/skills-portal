"use server"

import {GithubSignIn, MicrosoftSignIn} from "@/lib/auth-client";

export async function handleMicrosoftLogin ()  {
  try {
    await MicrosoftSignIn();
  } catch (error) {
    console.error('Microsoft login failed:', error);
  }
}

export async function handleGithubLogin(){
  try {
    await GithubSignIn();
  } catch (error) {
    console.error('GitHub login failed:', error);
  }
}