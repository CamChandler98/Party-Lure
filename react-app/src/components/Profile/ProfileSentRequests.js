
import { useSelector } from "react-redux"
import ReceivedRequest from "./ReceivedRequest"
import SentRequest from "./SentRequest"

const ProfileSentRequests = ({ requests, partyId, partyName }) => {

    useSelector(state => state.requests)

    return (
        <ul>
            {requests && requests.map(req => {
                return (
                    <li>
                        <SentRequest partyName={partyName} partyId={partyId} userId={req.id} />
                    </li>
                )
            })}
        </ul>
    )
}

export default ProfileSentRequests
