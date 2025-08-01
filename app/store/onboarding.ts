import { create } from 'zustand';

type OnboardingState = {
  fullName: string;
  skillOffer: string;
  skillLearn: string;
  genderPreference: string;

  setFullName: (name: string) => void;
  setSkillOffer: (skill: string) => void;
  setSkillLearn: (skill: string) => void;
  setGenderPreference: (pref: string) => void;
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  fullName: '',
  skillOffer: '',
  skillLearn: '',
  genderPreference: '',

  setFullName: (fullName) => set({ fullName }),
  setSkillOffer: (skillOffer) => set({ skillOffer }),
  setSkillLearn: (skillLearn) => set({ skillLearn }),
  setGenderPreference: (genderPreference) => set({ genderPreference }),
}));
