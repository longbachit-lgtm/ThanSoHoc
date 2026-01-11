import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuthStore } from "../store/useAuthStore";
import api from "../service/api";
import { numberKarmaActions } from "../store/numberKarma";
import { numberNameActions } from "../store/numberName";

export default function useNumerologyData() {
    const dispatch = useDispatch();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // Select relevant data from store to check if we have it
    const fullName = useSelector((state) => state.numberName.full_name_list);
    const birthDayList = useSelector((state) => state.numberKarmaMain.birth_day_list);

    useEffect(() => {
        const loadNumerologyData = async () => {
            // 1. If not authenticated, do nothing
            if (!isAuthenticated()) return;

            // 2. If we already have data in Redux, do nothing
            if (fullName || birthDayList) {
                return;
            }

            // 3. Fetch from API
            try {
                const response = await api.numerology.getMyData();
                const data = response.data || response;

                if (data) {
                    // Populate Redux store
                    dispatch(numberKarmaActions.setKamarNumeroMain(data.number || 0));
                    dispatch(numberKarmaActions.setKamarNumeroAtitute(data.atitute || 0));
                    dispatch(numberKarmaActions.setKamarNumeroDayBirth(data.day_birth || 0));
                    dispatch(numberKarmaActions.setBirthDayNumber(data.birthDayString || ""));
                    dispatch(numberKarmaActions.setBirthDayList(data.birthDayList || ""));
                    dispatch(numberKarmaActions.setArrow(data.arrow || []));
                    dispatch(numberKarmaActions.setLackArrow(data.lack_arrow || []));
                    dispatch(numberKarmaActions.setTop4Peak(data.top4 || {}));
                    dispatch(numberKarmaActions.setStrongListNumb(data.strong_list || []));
                    dispatch(numberKarmaActions.setWeakListNumb(data.weak_list || []));

                    dispatch(numberNameActions.setNumberDestiny(data.destiny || 0));
                    dispatch(numberNameActions.setNumberName(data.name || 0));
                    dispatch(numberNameActions.setNumberSoul(data.soul || 0));
                    dispatch(numberNameActions.setNumberInner(data.inner || "0"));
                    dispatch(numberNameActions.setNumberExpress(data.express || 0));
                    dispatch(numberNameActions.setNumberMature(data.mature || 0));
                    dispatch(numberNameActions.setFullNameNumber(data.full_name_number || ""));
                    dispatch(numberNameActions.setFullNameList(data.full_name_list || ""));

                    // Also save to localStorage for fallback
                    if (data.full_name_list) {
                        localStorage.setItem('userFullName', data.full_name_list);
                    }
                    if (data.birthDayList) {
                        const parts = data.birthDayList.split("/");
                        if (parts.length === 3) {
                            const [day, month, year] = parts.map((part) => parseInt(part, 10));
                            if (!Number.isNaN(day) && !Number.isNaN(month) && !Number.isNaN(year)) {
                                localStorage.setItem('userBirthDate', JSON.stringify({ day, month, year }));
                            }
                        }
                    }
                }
            } catch (err) {
                console.error("Error loading numerology data (hook):", err);
            }
        };

        loadNumerologyData();
    }, [isAuthenticated, fullName, birthDayList, dispatch]);
}
