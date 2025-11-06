import { useSelector } from "react-redux";
import ChartDateName from "../DetailNumber/ChartDateName";

export default function ChartsSection() {
  const birth_day = useSelector((state) => state.numberKarmaMain.birth_day);
  const full_name_numb = useSelector((state) => state.numberName.full_name_number);
  
  const combine_numb_birth_name = birth_day && full_name_numb 
    ? birth_day + "" + full_name_numb 
    : null;

  if (!birth_day) {
    return null;
  }

  return (
    <div 
      className="card border-0 shadow-sm mb-4"
      style={{
        backgroundColor: '#FCF8F0',
        borderRadius: '15px',
        border: '1px solid #E8C78C'
      }}
    >
      <div className="card-body p-4">
        {/* Birth Chart and Name Chart */}
        <div className="row mb-4">
          <div className="col-12 col-md-6 mb-3 mb-md-0">
            <ChartDateName
              numbersData={birth_day}
              color="#E8C78C"
              buttonText="BIỂU ĐỒ NGÀY SINH"
              buttonColor="#28a745"
              id_link="date_to_known"
            />
          </div>
          
          <div className="col-12 col-md-6">
            <ChartDateName
              numbersData={full_name_numb || ''}
              color="#3498da"
              buttonText="BIỂU ĐỒ HỌ TÊN"
              buttonColor="#9b59b6"
              disabled={!full_name_numb}
              id_link=""
            />
          </div>
        </div>

        {/* Combined Chart */}
        {combine_numb_birth_name && (
          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              <ChartDateName
                numbersData={combine_numb_birth_name}
                color="blue"
                buttonText="BIỂU ĐỒ TỔNG HỢP"
                buttonColor="#3cbc9b"
                disabled={true}
                id_link=""
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

