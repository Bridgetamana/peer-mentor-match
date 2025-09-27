export default function Testimonial() {
  const generateStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="#ff3d64"
        >
          <path
            d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z"
            stroke="#ff3d64"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <section id="testimonial" className="overflow-hidden my-20 w-full">
      <h2 className="section-title">Testimonial</h2>
      <p className="section-desc">
        Hear from students who’ve already found the right support and improved
        their learning journey.{" "}
      </p>
      <div className="flex items-center gap-6 mt-12 testimonial-slide">
        <div className="box-shadow p-4 flex flex-col gap-2 max-w-[300px] min-w-[250px]">
          <div className="flex gap-1.5 items-center">{generateStars(5)}</div>
          <p className="text-muted text-sm">
            I found a tutor within minutes, and it made my exam prep easier.
          </p>
          <p className="font-medium">Amaka O.</p>
        </div>
        <div className="box-shadow p-4 flex flex-col gap-2 max-w-[300px] min-w-[250px]">
          <div className="flex gap-1.5 items-center">{generateStars(4)}</div>
          <p className="text-muted text-sm">
            Teaching others helped me understand my courses better.
          </p>
          <p className="font-medium">John A.</p>
        </div>
        <div className="box-shadow p-4 flex flex-col gap-2 max-w-[300px] min-w-[250px]">
          <div className="flex gap-1.5 items-center">{generateStars(5)}</div>
          <p className="text-muted text-sm">
            I love that it pairs me with people in my university. Super helpful!
          </p>
          <p className="font-medium">Chiamaka N.</p>
        </div>
        <div className="box-shadow p-4 flex flex-col gap-2 max-w-[300px] min-w-[250px]">
          <div className="flex gap-1.5 items-center">{generateStars(3)}</div>
          <p className="text-muted text-sm">
            Took a while to match, but once I did, the session was really
            useful.
          </p>
          <p className="font-medium">David K.</p>
        </div>
        <div className="box-shadow p-4 flex flex-col gap-2 max-w-[300px] min-w-[250px]">
          <div className="flex gap-1.5 items-center">{generateStars(4)}</div>
          <p className="text-muted text-sm">
            The feedback after sessions keeps me motivated to learn more.
          </p>
          <p className="font-medium">Mary L.</p>
        </div>
        <div className="box-shadow p-4 flex flex-col gap-2 max-w-[300px] min-w-[250px]">
          <div className="flex gap-1.5 items-center">{generateStars(5)}</div>
          <p className="text-muted text-sm">
            Simple to use and exactly what I needed for group study.
          </p>
          <p className="font-medium">Michael S.</p>
        </div>
      </div>
    </section>
  );
}
