export default function Why() {
  return (
    <section id="benefit" className="mb-20">
      <h2 className="section-title">Benefits</h2>
      <p className="section-desc">
        Discover how peer-to-peer mentoring makes studying easier, faster, and
        more rewarding for everyone.
      </p>
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="box-shadow bg-[#45cf78]/70 p-5">
          <h3 className="text-xl font-bold mb-3 ">Smart Peer Matching</h3>
          <p className="text-muted">
            No stress finding the right study buddy. We automatically connect
            you with a mentor or learner in your school, studying the same
            subjects.
          </p>
        </div>

        <div className="box-shadow bg-accent/60 p-5">
          <h3 className="text-xl font-bold mb-3 ">Learn Faster Together</h3>
          <p className="text-muted">
            Get paired with peers based on subjects, experience levels, and
            learning goals
          </p>
        </div>

        <div className="box-shadow bg-accent/60 p-5">
          <h3 className="text-xl font-bold mb-3 ">Teach to Master</h3>
          <p className="text-muted">
            Explaining concepts as a tutor strengthens your own understanding
            and builds confidence.
          </p>
        </div>

        <div className="box-shadow bg-[#45cf78]/70 p-5">
          <h3 className="text-xl font-bold mb-3 ">Free and Accessible</h3>
          <p className="text-muted">
            peer mentoring is free and available anytime you need it.
          </p>
        </div>
      </div>
    </section>
  );
}
