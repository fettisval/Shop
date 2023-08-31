import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";

export function Loader() {
    return (
        <div className="loader">
            <FontAwesomeIcon icon={faSpinner} className="spinner" />
        </div>
    );
}