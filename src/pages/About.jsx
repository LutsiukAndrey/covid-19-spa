// export const About = () => {
//   return (
//     <div>
//       <h1>About</h1>
//       <p>
//         Our website provides you with up-to-date statistics on the COVID-19
//         pandemic, both globally and for individual countries. We strive to
//         deliver reliable information on the number of confirmed cases, deaths,
//         and recoveries to help you stay informed about the current situation.
//       </p>
//       <p>Key features of the website include:</p>
//       <ul>
//         <li>
//           1. Global Statistics: You can view overall statistics worldwide,
//           including the total number of confirmed cases, deaths, and recoveries.
//           This gives you a comprehensive picture of the pandemic's scale.
//         </li>
//         <li>
//           2.Country-specific Statistics: You can select a specific country and
//           access information on the number of confirmed cases, deaths, and
//           recoveries in that country. This helps you track the situation in your
//           chosen country and make informed decisions.
//         </li>
//         <li>
//           3.Date Range Selection: You have the option to choose a specific
//           period for which you want to retrieve statistics. You can specify the
//           start and end dates to limit the results to the desired timeframe.
//           This allows you to analyze the evolving situation over time.
//         </li>
//         <li>
//           4.Filtering by Deaths, Confirmed Cases, and Recoveries: You can filter
//           the data based on your specific interests. If you need information
//           only on the number of deaths, confirmed cases, or recoveries, you can
//           apply the corresponding filter. This allows you to focus on the
//           aspects of statistics that matter to you.
//         </li>
//         <p>
//           We strive to provide reliable data that is regularly updated, ensuring
//           you always have access to the most current information. Our website is
//           designed with user convenience in mind, making it easy for you to find
//           the relevant COVID-19 information you need.
//         </p>
//         <p>
//           We hope that our website will serve as a valuable tool, helping you
//           stay informed and make informed decisions during these challenging
//           times.
//         </p>
//       </ul>
//     </div>
//   );
// };

import '../App.css';

export const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About</h1>
      <p className="about-description">
        Our website provides you with up-to-date statistics on the COVID-19
        pandemic, both globally and for individual countries. We strive to
        deliver reliable information on the number of confirmed cases, deaths,
        and recoveries to help you stay informed about the current situation.
      </p>
      <p className="about-subheading">Key features of the website include:</p>
      <ul className="about-list">
        <li className="about-list-item">
          <span className="bullet">&#8226;</span> Global Statistics: You can
          view overall statistics worldwide, including the total number of
          confirmed cases, deaths, and recoveries. This gives you a
          comprehensive picture of the pandemic's scale.
        </li>
        <li className="about-list-item">
          <span className="bullet">&#8226;</span> Country-specific Statistics:
          You can select a specific country and access information on the number
          of confirmed cases, deaths, and recoveries in that country. This helps
          you track the situation in your chosen country and make informed
          decisions.
        </li>
        <li className="about-list-item">
          <span className="bullet">&#8226;</span> Date Range Selection: You have
          the option to choose a specific period for which you want to retrieve
          statistics. You can specify the start and end dates to limit the
          results to the desired timeframe. This allows you to analyze the
          evolving situation over time.
        </li>
        <li className="about-list-item">
          <span className="bullet">&#8226;</span> Filtering by Deaths, Confirmed
          Cases, and Recoveries: You can filter the data based on your specific
          interests. If you need information only on the number of deaths,
          confirmed cases, or recoveries, you can apply the corresponding
          filter. This allows you to focus on the aspects of statistics that
          matter to you.
        </li>
      </ul>
      <p className="about-description">
        We strive to provide reliable data that is regularly updated, ensuring
        you always have access to the most current information. Our website is
        designed with user convenience in mind, making it easy for you to find
        the relevant COVID-19 information you need.
      </p>
      <p className="about-description">
        We hope that our website will serve as a valuable tool, helping you stay
        informed and make informed decisions during these challenging times.
      </p>
    </div>
  );
};
