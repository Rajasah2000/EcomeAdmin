import { TbMathFunctionY } from "react-icons/tb";
import HttpClientXml from "../Utils/HttpClientXml";

async function AddCategory(data) {
  let endpoind = "add-category";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllCategory() {
  let endpoind = "view-Category";
  return HttpClientXml.get(endpoind);
}

async function UpdateCategory(id, data) {
  let endpoind = `update-Category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteCategory(id) {
  let endpoind = `delete-Category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddCountry(data) {
  let endpoind = "add-Country";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllCountry() {
  let endpoind = "view-Country";
  return HttpClientXml.get(endpoind);
}
async function UpdateCountry(id, data) {
  let endpoind = `update-Country/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteCountry(id) {
  let endpoind = `delete-Country/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddCategoryBanner(data) {
  let endpoind = "add-Category-Banner";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllBannerImage() {
  let endpoind = "view-Category-Banner";
  return HttpClientXml.get(endpoind);
}
async function UpdateBannerImage(id, data) {
  let endpoind = `update-Category-Banner/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteBannerImage(id) {
  let endpoind = `delete-Category-Banner/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddLanguage(data) {
  let endpoind = "add-Language";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllLanguage() {
  let endpoind = "view-Language";
  return HttpClientXml.get(endpoind);
}
async function UpdateLanguage(id, data) {
  let endpoind = `update-Language/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteLanguage(id) {
  let endpoind = `delete-Language/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddSubCategory(data) {
  let endpoind = "add-sub-category";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllSubCategory(id) {
  let endpoind = `view-Sub-Category/${id}`;
  return HttpClientXml.get(endpoind, id);
}

async function UpdateSubCategory(id, data) {
  let endpoind = `update-sub-Category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteSubCategory(id) {
  let endpoind = `delete-sub-Category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddBanner(data) {
  let endpoind = "add-Banner";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllBanner() {
  let endpoind = "view-Banner";
  return HttpClientXml.get(endpoind);
}
async function UpdateBanner(id, data) {
  let endpoind = `update-Banner/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteBanner(id) {
  let endpoind = `delete-Banner/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddUnit(data) {
  let endpoind = "add-Unit";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllUnit() {
  let endpoind = "view-Unit";
  return HttpClientXml.get(endpoind);
}
async function UpdateUnit(id, data) {
  let endpoind = `update-Unit/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteUnit(id) {
  let endpoind = `delete-Unit/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}
async function ViewAllApprovedPartnerList() {
  let endpoind = "view-Approved-PartnerList";
  return HttpClientXml.get(endpoind);
}
async function ViewAllPendingPartnerList() {
  let endpoind = "view-Pending-ForApproval";
  return HttpClientXml.get(endpoind);
}
async function PartnerApprovedByAdmin(id) {
  let endpoind = `eStore-Partner-Approved-ByAdmin/${id}`;
  return HttpClientXml.put(endpoind);
}

async function AddMusicCategory(data) {
  let endpoind = "add-music-category";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllMusicCategory() {
  let endpoind = "view-music-category";
  return HttpClientXml.get(endpoind);
}
async function UpdateMusicCategory(id, data) {
  let endpoind = `update-music-category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteMusicCategory(id) {
  let endpoind = `delete-music-category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddMusicGenre(data) {
  let endpoind = "add-music-genre";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllMusicGenre() {
  let endpoind = "view-music-genre";
  return HttpClientXml.get(endpoind);
}
async function UpdateMusicGenre(id, data) {
  let endpoind = `update-music-genre/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteMusicGenre(id) {
  let endpoind = `delete-music-genre/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddPodCastCategory(data) {
  let endpoind = "add-podcast-category";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllPodCastCategory() {
  let endpoind = "view-podcast-category";
  return HttpClientXml.get(endpoind);
}
async function UpdatePodCastCategory(id, data) {
  let endpoind = `update-podcast-category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeletePodCastCategory(id) {
  let endpoind = `delete-podcast-category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddPoints(data) {
  let endpoind = "add-podcast-points";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllPoints() {
  let endpoind = "view-podcast-points";
  return HttpClientXml.get(endpoind);
}
async function AddMood(data) {
  let endpoind = "add-music-mood";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllMood() {
  let endpoind = "view-music-mood";
  return HttpClientXml.get(endpoind);
}
async function UpdateMood(id, data) {
  let endpoind = `update-music-mood/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteMood(id) {
  let endpoind = `delete-music-mood/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}
async function AddPodCastGenre(data) {
  let endpoind = "add-podcast-genre";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllPodCastGenre() {
  let endpoind = "view-podcast-genre";
  return HttpClientXml.get(endpoind);
}
async function UpdatePodcastGenre(id, data) {
  let endpoind = `update-podcast-genre/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeletePodcastGenre(id) {
  let endpoind = `delete-podcast-genre/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddPodCastSubscription(data) {
  let endpoind = "add-podcast-subscription";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllPodCastSubscription() {
  let endpoind = "view-podcast-subscription";
  return HttpClientXml.get(endpoind);
}
async function UpdatePodcastSubscription(id, data) {
  let endpoind = `update-podcast-subscription/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeletePodcastSubscription(id) {
  let endpoind = `delete-podcast-subscription/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddOttPartner(data) {
  let endpoind = "add-OTT-Category";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllOttPartner() {
  let endpoind = "view-podcast-subscription";
  return HttpClientXml.get(endpoind);
}
async function UpdateOttPartner(id, data) {
  let endpoind = `update-podcast-subscription/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteOttPartner(id) {
  let endpoind = `delete-podcast-subscription/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddOttContentLanguage(data) {
  let endpoind = "add-OTT-content-language";
  return HttpClientXml.post(endpoind, data);
}
async function ViewAllOttContentLanguage() {
  let endpoind = "get-OTT-content-language";
  return HttpClientXml.get(endpoind);
}
async function UpdateOttContentLanguage(id, data) {
  let endpoind = `update-OTT-content-language/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteOttContentLanguage(id) {
  let endpoind = `delete-OTT-content-language/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}
async function ViewAllApprovedOTTPartnerShipList() {
  let endpoind = "view-Approved-OTT-PartnerList";
  return HttpClientXml.get(endpoind);
}
async function ViewAllDisApprovedOTTPartnerShipList() {
  let endpoind = "view-Pending-OTT-ForApproval";
  return HttpClientXml.get(endpoind);
}
async function OTTPartnerApprovedByAdmin(id) {
  let endpoind = `ott-Partner-Approved-ByAdmin/${id}`;
  return HttpClientXml.put(endpoind);
}
async function AddLearningCategory(data) {
  let endpoind = "add-learning-category";
  return HttpClientXml.post(endpoind,data);
}
async function ViewLearningCategory() {
  let endpoind = "view-learning-category";
  return HttpClientXml.get(endpoind);
}
async function DeleteLearningCategory(id) {
  let endpoind = `delete-learning-category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}
async function UpdateLearningCategory(id, data) {
  let endpoind = `update-learning-category/${id}`;
  return HttpClientXml.put(endpoind, data);
}
async function ViewLearningExpertise(){
  let endpoint="view-learning-expertise";
  return HttpClientXml.get(endpoint)
}
async function AddLearningExpertise(data){
  let endpoint="add-learning-expertise"
  return HttpClientXml.post(endpoint,data)
}

async function EditLearningExpertise(id,data){
  let endpoint=`update-learning-expertise/${id}`
  return HttpClientXml.put(endpoint,data)
}

async function DeleteLearningExpertise(id) {
  let endpoind = `delete-learning-expertise/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}



async function ViewOttSubscription(){
  let endpoint="view-ott-subscription";
  return HttpClientXml.get(endpoint)
}
async function AddOttSubscription(data){
  let endpoint="add-ott-subscription"
  return HttpClientXml.post(endpoint,data)
}

async function EditOttSubscription(id,data){
  let endpoint=`update-ott-subscription/${id}`
  return HttpClientXml.put(endpoint,data)
}

async function DeleteOttSubscription(id) {
  let endpoind = `delete-ott-subscription/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddOttMainBanner(data) {
  let endpoind = "add-ott-mainBanner";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllOttMainBanner() {
  let endpoind = "view-ott-mainBanner";
  return HttpClientXml.get(endpoind);
}

async function UpdateOttMainBanner(id, data) {
  let endpoind = `update-ott-mainBanner/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteOttMainBanner(id) {
  let endpoind = `delete-ott-mainBanner/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddOttPoints(data) {
  let endpoind = "add-ott-points";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllOttPoints() {
  let endpoind = "view-ott-points";
  return HttpClientXml.get(endpoind);
}

async function UpdateOttPoints(id, data) {
  let endpoind = `update-ott-points/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteOttPoints(id) {
  let endpoind = `delete-ott-points/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddScratchcard(data) {
  let endpoind = "add-scratchcard";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllScratchcard() {
  let endpoind = "view-scratchcard";
  return HttpClientXml.get(endpoind);
}

async function UpdateScratchcard(id, data) {
  let endpoind = `update-scratchcard/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteScratchcard(id) {
  let endpoind = `delete-scratchcard/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}


async function AddDonation(data) {
  let endpoind = "add-donation-category";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllDonation() {
  let endpoind = "view-donation-category";
  return HttpClientXml.get(endpoind);
}

async function UpdateDonation(id, data) {
  let endpoind = `update-donation-category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteDonation(id) {
  let endpoind = `delete-donation-category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddTimeZone(data) {
  let endpoind = "add-timezone";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllTimeZoneData() {
  let endpoind = "view-timezone";
  return HttpClientXml.get(endpoind);
}

async function UpdateTimeZone(id, data) {
  let endpoind = `update-timezone/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteTimeZone(id) {
  let endpoind = `delete-timezone/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}


async function AddNewsCategory(data) {
  let endpoind = "add-news-category";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllNewsCategory() {
  let endpoind = "view-news-category";
  return HttpClientXml.get(endpoind);
}

async function UpdateNewsCategory(id, data) {
  let endpoind = `update-news-category/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteNewsCategory(id) {
  let endpoind = `delete-news-category/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddNews(data) {
  let endpoind = "add-news";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllNews() {
  let endpoind = "view-news";
  return HttpClientXml.get(endpoind);
}

async function UpdateNews(id, data) {
  let endpoind = `update-news/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteNews(id) {
  let endpoind = `delete-news/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddCommission(data) {
  let endpoind = "add-commission";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllCommission() {
  let endpoind = "view-commission";
  return HttpClientXml.get(endpoind);
}

async function UpdateCommission(id, data) {
  let endpoind = `update-commission/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteCommission(id) {
  let endpoind = `delete-commission/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddEvent(data) {
  let endpoind = "add-event";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllEvent() {
  let endpoind = "view-event";
  return HttpClientXml.get(endpoind);
}

async function UpdateEvent(id, data) {
  let endpoind = `update-event/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteEvent(id) {
  let endpoind = `delete-event/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function AddSession(data) {
  let endpoind = "add-session";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllSession() {
  let endpoind = "view-session";
  return HttpClientXml.get(endpoind);
}

async function UpdateSession(id, data) {
  let endpoind = `update-session/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteSession(id) {
  let endpoind = `delete-session/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}

async function ViewEventWiseSession(data) {
  let endpoind = "event-wise-session";
  return HttpClientXml.post(endpoind, data);
}



async function AddSpeaker(data) {
  let endpoind = "add-speaker";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllSpeaker() {
  let endpoind = "view-speaker";
  return HttpClientXml.get(endpoind);
}

async function UpdateSpeaker(id, data) {
  let endpoind = `update-speaker/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteSpeaker(id) {
  let endpoind = `delete-speaker/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}


async function AddSponser(data) {
  let endpoind = "add-sponser";
  return HttpClientXml.post(endpoind, data);
}

async function ViewAllSponser() {
  let endpoind = "view-sponser";
  return HttpClientXml.get(endpoind);
}

async function UpdateSponser(id, data) {
  let endpoind = `update-sponser/${id}`;
  return HttpClientXml.put(endpoind, data);
}

async function DeleteSponser(id) {
  let endpoind = `delete-sponser/${id}`;
  return HttpClientXml.deletemethod(endpoind);
}



export default {
  ViewEventWiseSession,
  AddSponser,
  ViewAllSponser,
  DeleteSponser,
  UpdateSponser,
  AddSpeaker,
  ViewAllSpeaker,
  UpdateSpeaker,
  DeleteSpeaker,
  AddCommission,
  ViewAllSession,
  UpdateSession,
  DeleteSession,
  AddSession,
  AddEvent,
  ViewAllEvent,
  UpdateEvent,
  DeleteEvent,
  ViewAllCommission,
  UpdateCommission,
  DeleteCommission,
  AddNews,
  ViewAllNews,
  UpdateNews,
  DeleteNews,
  AddOttMainBanner,
  ViewAllNewsCategory,
  UpdateNewsCategory,
  DeleteNewsCategory,
  AddNewsCategory,
  ViewAllTimeZoneData,
  DeleteTimeZone,
  UpdateTimeZone,
  AddTimeZone,
  AddDonation,
  UpdateDonation,
  DeleteDonation,
  ViewAllDonation,
  ViewAllScratchcard,
  AddScratchcard,
  UpdateScratchcard,
  DeleteScratchcard,
  AddOttPoints,
  UpdateOttPoints,
  DeleteOttPoints,
  ViewAllOttPoints,
  ViewAllOttMainBanner,
  UpdateOttMainBanner,
  DeleteOttMainBanner,
  AddOttSubscription,
  DeleteOttSubscription,
  EditOttSubscription,
  AddLearningExpertise,
  ViewOttSubscription,
  EditLearningExpertise,
  DeleteLearningExpertise,
  ViewLearningExpertise,
  AddLearningCategory,
  ViewLearningCategory,
  DeleteLearningCategory,
  UpdateLearningCategory,
  OTTPartnerApprovedByAdmin,
  AddOttContentLanguage,
  DeleteOttContentLanguage,
  UpdateOttContentLanguage,
  ViewAllOttContentLanguage,
  AddPodCastSubscription,
  AddOttPartner,
  ViewAllPodCastSubscription,
  UpdatePodcastSubscription,
  DeletePodcastSubscription,
  AddPodCastGenre,
  ViewAllPodCastGenre,
  UpdatePodcastGenre,
  DeletePodcastGenre,
  DeleteMood,
  AddMood,
  UpdateMood,
  ViewAllMood,
  AddPoints,
  ViewAllPoints,
  DeletePodCastCategory,
  AddPodCastCategory,
  ViewAllPodCastCategory,
  UpdatePodCastCategory,
  AddMusicGenre,
  DeleteMusicGenre,
  ViewAllMusicGenre,
  UpdateMusicGenre,
  AddMusicCategory,
  ViewAllMusicCategory,
  DeleteMusicCategory,
  UpdateMusicCategory,
  AddCategory,
  ViewAllCategory,
  UpdateCategory,
  DeleteCategory,
  AddCountry,
  ViewAllCountry,
  UpdateCountry,
  DeleteCountry,
  AddCategoryBanner,
  ViewAllBannerImage,
  UpdateBannerImage,
  DeleteBannerImage,
  AddLanguage,
  ViewAllLanguage,
  UpdateLanguage,
  DeleteLanguage,
  AddSubCategory,
  ViewAllSubCategory,
  UpdateSubCategory,
  DeleteSubCategory,
  AddBanner,
  ViewAllBanner,
  UpdateBanner,
  DeleteBanner,
  AddUnit,
  ViewAllUnit,
  UpdateUnit,
  DeleteUnit,
  ViewAllApprovedPartnerList,
  ViewAllPendingPartnerList,
  PartnerApprovedByAdmin,
  ViewAllApprovedOTTPartnerShipList,
  ViewAllDisApprovedOTTPartnerShipList,
};
